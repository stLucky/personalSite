import { gsap } from "gsap";

export default class Gsap {
  public readonly engine = gsap;

  public animatePerson (
    tl: gsap.core.Timeline,
    person: gsap.TweenTarget,
    direction: "x" | "y" = "x"
  ) {
    return tl.to(person, {
      ...(direction === "x" ? { x: 0 } : { y: 0 }),
      opacity: 1,
      duration: 3,
      ease: "elastic.out(1, 0.4)",
      startAt: {
        ...(direction === "x" ? { x: -500 } : { y: 500 }),
        opacity: 0
      }
    });
  }

  public prepareText (
    core: gsap.core.Timeline | typeof gsap,
    text: gsap.TweenTarget
  ) {
    core.set(text, {
      autoAlpha: 0
    });
  }

  public animateText (
    core: gsap.core.Timeline | typeof gsap,
    text: gsap.TweenTarget,
    position: gsap.Position | undefined = undefined
  ) {
    return core.to(
      text,
      {
        autoAlpha: 1,
        duration: 1,
        stagger: 0.2
      },
      position
    );
  }

  public prepareDecor (tl: gsap.core.Timeline, decor: gsap.TweenTarget) {
    tl.set(decor, {
      opacity: 0,
      scale: 0
    });
  }

  public animateDecor (
    tl: gsap.core.Timeline,
    decor: gsap.TweenTarget,
    position: gsap.Position = ">-2"
  ) {
    tl.to(
      decor,
      {
        opacity: 1,
        scale: 1,
        stagger: 0.2
      },
      position
    );
  }

  public timeline (
    defaults: gsap.TweenVars = { ease: "ease.in", duration: 0.5 }
  ) {
    return this.engine.timeline({
      defaults
    });
  }

  public mouseMove (
    targets: gsap.TweenTarget,
    evt: MouseEvent,
    stagger: gsap.NumberValue | gsap.StaggerVars = {}
  ) {
    const { x, y } = this.#getCoordinates(evt);
    this.engine.to(targets, {
      x,
      y,
      stagger
    });
  }

  public makeVisible (targets: gsap.TweenTarget) {
    this.engine.set(targets, {
      autoAlpha: 1
    });
  }

  #getCoordinates (evt: MouseEvent) {
    const ZOOM_FACTOR = 10;
    const x = (evt.clientX / window.innerWidth) * ZOOM_FACTOR;
    const y = (evt.clientY / window.innerHeight) * ZOOM_FACTOR;

    return { x, y };
  }
}
