import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type CursorKind = "row" | "link" | "nav" | "cta" | "key" | "card" | "small" | "input" | "standard";

type CursorTarget = {
  element: HTMLElement;
  left: number;
  top: number;
  width: number;
  height: number;
  paddingX: number;
  paddingY: number;
  radius: number;
  kind: CursorKind;
  pull: number;
  maxPull: number;
  offsetX: number;
  offsetY: number;
  originalTranslate: string;
  originalWillChange: string;
};

const TARGET_PROFILES: Record<CursorKind, { paddingX: number; paddingY: number; pull: number; maxPull: number }> = {
  row: { paddingX: 6, paddingY: 6, pull: 0.14, maxPull: 5 },
  link: { paddingX: 6, paddingY: 4, pull: 0.16, maxPull: 3 },
  nav: { paddingX: 6, paddingY: 4, pull: 0.16, maxPull: 3 },
  cta: { paddingX: 8, paddingY: 8, pull: 0.2, maxPull: 7 },
  key: { paddingX: 4, paddingY: 4, pull: 0.18, maxPull: 5 },
  card: { paddingX: 6, paddingY: 6, pull: 0.18, maxPull: 6 },
  small: { paddingX: 4, paddingY: 4, pull: 0.14, maxPull: 2 },
  input: { paddingX: 5, paddingY: 5, pull: 0.14, maxPull: 3 },
  standard: { paddingX: 6, paddingY: 6, pull: 0.18, maxPull: 6 },
};

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export default function ElasticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(finePointer.matches && !reducedMotion.matches);
    update();
    finePointer.addEventListener("change", update);
    reducedMotion.addEventListener("change", update);
    return () => {
      finePointer.removeEventListener("change", update);
      reducedMotion.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    setPortalTarget(document.body);
    document.body.classList.add("elastic-cursor-active");

    const pointer = { x: 0, y: 0, previousX: 0, previousY: 0, started: false };
    const blob = { x: 0, y: 0, vx: 0, vy: 0, width: 50, height: 50, radius: 25 };
    const releasing: CursorTarget[] = [];
    const getCursor = () => cursorRef.current;
    let target: CursorTarget | null = null;
    let frame = 0;
    let lastFrame = 0;

    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(draw);
    };

    const getPortalTarget = () => {
      const dialogs = document.querySelectorAll<HTMLDialogElement>("dialog[open]");
      return dialogs.item(dialogs.length - 1) ?? document.body;
    };

    const restoreTarget = (released: CursorTarget) => {
      released.element.style.translate = released.originalTranslate;
      released.element.style.willChange = released.originalWillChange;
    };

    const releaseTarget = () => {
      if (!target) return;
      releasing.push(target);
      target = null;
      getCursor()?.classList.remove("is-target");
      schedule();
    };

    const measureTarget = (element: HTMLElement, offsetX = 0, offsetY = 0): CursorTarget => {
      const rect = element.getBoundingClientRect();
      const kind = (element.dataset.cursorKind as CursorKind | undefined) ?? "standard";
      const profile = TARGET_PROFILES[kind] ?? TARGET_PROFILES.standard;
      const computed = getComputedStyle(element);
      const rawRadius = Number.parseFloat(computed.borderTopLeftRadius) || 0;
      const isPill = computed.borderTopLeftRadius.includes("%")
        || rawRadius >= Math.min(rect.width, rect.height) / 2 - 1;
      const wrapperWidth = rect.width + profile.paddingX * 2;
      const wrapperHeight = rect.height + profile.paddingY * 2;
      const radius = isPill
        ? Math.min(wrapperWidth, wrapperHeight) / 2
        : Math.min(
            (rawRadius || (kind === "link" || kind === "nav" || kind === "small" ? 3 : 8))
              + Math.min(profile.paddingX, profile.paddingY),
            wrapperWidth / 2,
            wrapperHeight / 2,
          );

      return {
        element,
        left: rect.left - offsetX,
        top: rect.top - offsetY,
        width: rect.width,
        height: rect.height,
        paddingX: profile.paddingX,
        paddingY: profile.paddingY,
        radius,
        kind,
        pull: profile.pull,
        maxPull: profile.maxPull,
        offsetX,
        offsetY,
        originalTranslate: element.style.translate,
        originalWillChange: element.style.willChange,
      };
    };

    const acquireTarget = (element: HTMLElement) => {
      const releasingIndex = releasing.findIndex((entry) => entry.element === element);
      if (releasingIndex >= 0) {
        target = releasing.splice(releasingIndex, 1)[0];
        const measured = measureTarget(element, target.offsetX, target.offsetY);
        target.left = measured.left;
        target.top = measured.top;
        target.width = measured.width;
        target.height = measured.height;
        target.paddingX = measured.paddingX;
        target.paddingY = measured.paddingY;
        target.radius = measured.radius;
        target.kind = measured.kind;
        target.pull = measured.pull;
        target.maxPull = measured.maxPull;
      } else {
        target = measureTarget(element);
        element.style.willChange = "translate";
      }
      getCursor()?.classList.add("is-target");
      schedule();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!pointer.started) {
        pointer.started = true;
        pointer.previousX = pointer.x;
        pointer.previousY = pointer.y;
        blob.x = pointer.x;
        blob.y = pointer.y;
      }

      const origin = event.target;
      const excluded = origin instanceof Element
        && origin.closest('[data-no-custom-cursor="true"]');
      const cursor = getCursor();
      if (excluded) {
        document.body.classList.add("elastic-cursor-native");
        releaseTarget();
        if (cursor) cursor.style.opacity = "0";
      } else {
        document.body.classList.remove("elastic-cursor-native");
        if (cursor) cursor.style.opacity = "1";
      }
      schedule();
    };

    const onPointerOver = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;
      const origin = event.target;
      if (!(origin instanceof Element)) return;
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      if (!pointer.started) {
        pointer.started = true;
        pointer.previousX = pointer.x;
        pointer.previousY = pointer.y;
        blob.x = pointer.x;
        blob.y = pointer.y;
      }
      setPortalTarget(getPortalTarget());
      schedule();
      const excluded = origin.closest<HTMLElement>('[data-no-custom-cursor="true"]');
      if (excluded) {
        document.body.classList.add("elastic-cursor-native");
        releaseTarget();
        const cursor = getCursor();
        if (cursor) cursor.style.opacity = "0";
        return;
      }
      document.body.classList.remove("elastic-cursor-native");
      const cursor = getCursor();
      if (cursor) cursor.style.opacity = "1";
      const next = origin.closest<HTMLElement>(".cursor-can-hover");
      if (next === target?.element) return;
      if (target) releaseTarget();
      if (next) acquireTarget(next);
    };

    const onPointerLeave = () => {
      pointer.started = false;
      releaseTarget();
      document.body.classList.remove("elastic-cursor-native");
      const cursor = getCursor();
      if (cursor) cursor.style.opacity = "0";
    };

    const onScroll = () => schedule();

    const dialogObserver = new MutationObserver(() => {
      const topDialog = getPortalTarget();
      const targetDialog = target?.element.closest("dialog");
      if (target && ((targetDialog && !targetDialog.open)
        || (topDialog !== document.body && !topDialog.contains(target.element)))) {
        releaseTarget();
      }
      setPortalTarget(topDialog);
    });
    dialogObserver.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ["open"],
    });

    function draw(time: number) {
      frame = 0;
      const delta = lastFrame ? Math.min(2, (time - lastFrame) / 16.67) : 1;
      lastFrame = time;
      if (target && !target.element.isConnected) releaseTarget();
      const active = target;
      let pointerSpeed = 0;

      if (pointer.started) {
        pointerSpeed = Math.min(
          24,
          Math.hypot(pointer.x - pointer.previousX, pointer.y - pointer.previousY) / delta,
        );
        pointer.previousX = pointer.x;
        pointer.previousY = pointer.y;
      }

      for (let index = releasing.length - 1; index >= 0; index -= 1) {
        const released = releasing[index];
        released.offsetX += (0 - released.offsetX) * 0.2 * delta;
        released.offsetY += (0 - released.offsetY) * 0.2 * delta;
        released.element.style.translate = `${released.offsetX}px ${released.offsetY}px`;
        if (Math.abs(released.offsetX) < 0.15 && Math.abs(released.offsetY) < 0.15) {
          restoreTarget(released);
          releasing.splice(index, 1);
        }
      }

      if (active) {
        const rect = active.element.getBoundingClientRect();
        active.left = rect.left - active.offsetX;
        active.top = rect.top - active.offsetY;
        active.width = rect.width;
        active.height = rect.height;

        const centerX = active.left + active.width / 2;
        const centerY = active.top + active.height / 2;
        const pullX = clamp((pointer.x - centerX) * active.pull, -active.maxPull, active.maxPull);
        const pullY = clamp((pointer.y - centerY) * active.pull, -active.maxPull, active.maxPull);
        active.offsetX += (pullX - active.offsetX) * 0.18 * delta;
        active.offsetY += (pullY - active.offsetY) * 0.18 * delta;
        active.element.style.translate = `${active.offsetX}px ${active.offsetY}px`;

        const leadX = clamp((pointer.x - centerX) * 0.12, -10, 10);
        const leadY = clamp((pointer.y - centerY) * 0.12, -10, 10);
        const ease = 1 - Math.pow(0.88, delta);
        blob.x += (centerX + active.offsetX + leadX - blob.x) * ease;
        blob.y += (centerY + active.offsetY + leadY - blob.y) * ease;
        blob.width += (active.width + active.paddingX * 2 - blob.width) * ease;
        blob.height += (active.height + active.paddingY * 2 - blob.height) * ease;
        blob.radius += (active.radius - blob.radius) * ease;
      } else {
        const spring = 0.18 * delta;
        const damping = Math.pow(0.72, delta);
        blob.vx = (blob.vx + (pointer.x - blob.x) * spring) * damping;
        blob.vy = (blob.vy + (pointer.y - blob.y) * spring) * damping;
        blob.x += blob.vx * delta;
        blob.y += blob.vy * delta;
        const stretch = Math.min(0.36, Math.hypot(blob.vx, blob.vy) / 24);
        blob.width += (50 + stretch * 58 - blob.width) * 0.24 * delta;
        blob.height += (50 - blob.height) * 0.24 * delta;
        blob.radius += (Math.min(blob.width, blob.height) / 2 - blob.radius) * 0.24 * delta;
      }

      const cursor = getCursor();
      if (cursor) {
        const stretch = active ? 0 : Math.min(0.36, Math.hypot(blob.vx, blob.vy) / 24);
        const angle = active ? 0 : (Math.atan2(blob.vy, blob.vx) * 180) / Math.PI;
        const parent = cursor.parentElement;
        const dialog = parent instanceof HTMLDialogElement ? parent : null;
        const dialogHasTransform = dialog && getComputedStyle(dialog).transform !== "none";
        const bounds = dialogHasTransform ? dialog.getBoundingClientRect() : null;
        const x = blob.x - (bounds?.left ?? 0) - (dialog?.clientLeft ?? 0);
        const y = blob.y - (bounds?.top ?? 0) - (dialog?.clientTop ?? 0);
        cursor.classList.toggle("in-dialog", Boolean(dialog));
        cursor.classList.toggle("is-target", Boolean(active));
        const cursorKind = active?.kind ?? "free";
        if (cursor.dataset.cursorKind !== cursorKind) cursor.dataset.cursorKind = cursorKind;
        cursor.style.width = `${blob.width}px`;
        cursor.style.height = `${blob.height}px`;
        cursor.style.borderRadius = `${blob.radius}px`;
        cursor.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${angle}deg) scaleY(${1 - stretch * 0.42})`;
      }

      const settled = Math.hypot(pointer.x - blob.x, pointer.y - blob.y) < 0.25
        && Math.hypot(blob.vx, blob.vy) < 0.25;
      if (active || releasing.length > 0 || !settled || pointerSpeed > 0.1) schedule();
    }

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("blur", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      dialogObserver.disconnect();
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("blur", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      if (target) restoreTarget(target);
      releasing.forEach(restoreTarget);
      document.body.classList.remove("elastic-cursor-active", "elastic-cursor-native");
      setPortalTarget(null);
    };
  }, [enabled]);

  if (!enabled || !portalTarget) return null;

  return createPortal(
    <div ref={cursorRef} className="elastic-cursor" aria-hidden="true" />,
    portalTarget,
  );
}
