/**
 * Cubic bezier points
 */
export type CubicBezierPoints = [number, number, number, number];

/**
 * Easing function
 */
export type EasingFunction = (t: number) => number;

// The [p0] (x1), [p1] (y1), [p2] (x2) and [p3] (y2) arguments must not be null.
// const createEasingFunctionV2 = lazy<CubicBezierPoints, EasingFunction>(
//     (cubicBezierPoints: CubicBezierPoints): EasingFunction => {
//         /**
//          * The x coordinate of the first control point.
//          *
//          * The line through the point (0, 0) and the first control point is tangent
//          * to the curve at the point (0, 0).
//          */
//         const x1 = cubicBezierPoints[0];

//         /**
//          * The y coordinate of the first control point.
//          *
//          * The line through the point (0, 0) and the first control point is tangent
//          * to the curve at the point (0, 0).
//          */
//         const y1 = cubicBezierPoints[1];

//         /**
//          * The x coordinate of the second control point.
//          *
//          * The line through the point (1, 1) and the second control point is tangent
//          * to the curve at the point (1, 1).
//          */
//         const x2 = cubicBezierPoints[2];

//         /**
//          * The y coordinate of the second control point.
//          *
//          * The line through the point (1, 1) and the second control point is tangent
//          * to the curve at the point (1, 1).
//          */
//         const y2 = cubicBezierPoints[3];

//         const _cubicErrorBound = 0.001;

//         function evaluateCubic(p1: number, p2: number, midpoint: number) {
//             return (
//                 3 * p1 * (1 - midpoint) * (1 - midpoint) * midpoint +
//                 3 * p2 * (1 - midpoint) * midpoint * midpoint +
//                 midpoint * midpoint * midpoint
//             );
//         }
//         function easingFunction(t: number): number {
//             let start: number = 0.0;
//             let end: number = 1.0;
//             while (true) {
//                 let midpoint = (start + end) / 2;
//                 const estimate = evaluateCubic(x1, x2, midpoint);
//                 if (Math.abs(t - estimate) < _cubicErrorBound) {
//                     return evaluateCubic(y1, y2, midpoint);
//                 }
//                 if (estimate < t) {
//                     start = midpoint;
//                 } else {
//                     end = midpoint;
//                 }
//             }
//         }
//         return easingFunction;
//     }
// );

/**
 * Create an easing function from cubic bezier points.
 * The x1 coordinate of the first control point.
 *
 * The line through the point (0, 0) and the first control point is tangent
 * to the curve at the point (0, 0).
 *
 * The y1 coordinate of the first control point.
 *
 * The line through the point (0, 0) and the first control point is tangent
 * to the curve at the point (0, 0).
 *
 * The x2 coordinate of the second control point.
 *
 * The line through the point (1, 1) and the second control point is tangent
 * to the curve at the point (1, 1).
 *
 * The y2 coordinate of the second control point.
 *
 * The line through the point (1, 1) and the second control point is tangent
 * to the curve at the point (1, 1).
 */
const createEasingFunction = ([p0, p1, p2, p3]: CubicBezierPoints): EasingFunction => {
  const a = (a1: number, a2: number) => 1 - 3 * a2 + 3 * a1;
  const b = (a1: number, a2: number) => 3 * a2 - 6 * a1;
  const c = (a1: number) => 3 * a1;

  const calcBezier = (t: number, a1: number, a2: number) => ((a(a1, a2) * t + b(a1, a2)) * t + c(a1)) * t;

  const getSlope = (t: number, a1: number, a2: number) => 3 * a(a1, a2) * t * t + 2 * b(a1, a2) * t + c(a1);

  const getTforX = (x: number) => {
    let aGuessT = x;

    for (let i = 0; i < 4; ++i) {
      const currentSlope = getSlope(aGuessT, p0, p2);
      if (currentSlope === 0) return aGuessT;
      const currentX = calcBezier(aGuessT, p0, p2) - x;
      aGuessT -= currentX / currentSlope;
    }

    return aGuessT;
  };

  return (x: number) => (p0 === p1 && p2 === p3 ? x : calcBezier(getTforX(x), p1, p3));
};

function bounce(t: number) {
  if (t < 1.0 / 2.75) {
    return 7.5625 * t * t;
  } else if (t < 2 / 2.75) {
    t -= 1.5 / 2.75;
    return 7.5625 * t * t + 0.75;
  } else if (t < 2.5 / 2.75) {
    t -= 2.25 / 2.75;
    return 7.5625 * t * t + 0.9375;
  }
  t -= 2.625 / 2.75;
  return 7.5625 * t * t + 0.984375;
}

function BounceIn(): EasingFunction {
  return (t: number) => 1.0 - bounce(1.0 - t);
}

function BounceInOut(): EasingFunction {
  function easingFunction(t: number) {
    if (t < 0.5) {
      return (1.0 - bounce(1.0 - t * 2.0)) * 0.5;
    } else {
      return bounce(t * 2.0 - 1.0) * 0.5 + 0.5;
    }
  }
  return easingFunction;
}

function BounceOut(): EasingFunction {
  return bounce;
}

// A curve where the rate of change starts out quickly and then decelerates; an
// upside-down `f(t) = t²` parabola.
function Decelerate(): EasingFunction {
  return (t: number) => {
    t = 1.0 - t;
    return 1.0 - t * t;
  };
}

function ElasticIn(): EasingFunction {
  // The duration of the oscillation.
  const period = 0.4;
  return (t: number) => {
    const s = period / 4.0;
    t = t - 1.0;
    return -Math.pow(2.0, 10.0 * t) * Math.sin(((t - s) * (Math.PI * 2.0)) / period);
  };
}

function ElasticInOut(): EasingFunction {
  // The duration of the oscillation.
  const period = 0.4;
  return (t: number) => {
    const s = period / 4.0;
    t = 2.0 * t - 1.0;
    if (t < 0.0) {
      return -0.5 * Math.pow(2.0, 10.0 * t) * Math.sin(((t - s) * (Math.PI * 2.0)) / period);
    } else {
      return Math.pow(2.0, -10.0 * t) * Math.sin(((t - s) * (Math.PI * 2.0)) / period) * 0.5 + 1.0;
    }
  };
}

function ElasticOut(): EasingFunction {
  // The duration of the oscillation.
  const period = 0.4;

  return (t: number) => {
    const s = period / 4.0;
    return Math.pow(2.0, -10 * t) * Math.sin(((t - s) * (Math.PI * 2.0)) / period) + 1.0;
  };
}

export { createEasingFunction };

/** A linear animation curve.
 *
 * This is the identity map over the unit interval: its [Curve.transform]
 * method returns its input unmodified. This is useful as a default curve for
 * cases where a [Curve] is required but no actual curve is desired.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_linear.mp4)
 */
export const linear: EasingFunction = (t: number) => t;

/** A curve where the rate of change starts out quickly and then decelerates; an
 * upside-down `f(t) = t²` parabola.
 *
 * This is equivalent to the Android `DecelerateInterpolator` class with a unit
 * factor (the default factor).
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_decelerate.mp4)
 */
export const decelerateCurve = Decelerate();

/**
 * A curve that is very steep and linear at the beginning, but quickly flattens out
 * and very slowly eases in
 *
 * By default is the curve used to animate pages on iOS back to their original
 * position if a swipe gesture is ended midway through a swipe.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_fast_linear_to_slow_ease_in.mp4)
 */
export const fastLinearToSlowEaseIn = createEasingFunction([0.18, 1.0, 0.04, 1.0]);

/**
 * A cubic animation curve that speeds up quickly and ends slowly.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease.mp4)
 */
export const ease = createEasingFunction([0.25, 0.1, 0.25, 1.0]);

/** A cubic animation curve that starts slowly and ends quickly.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in.mp4)
 */
export const easeIn = createEasingFunction([0.42, 0.0, 1.0, 1.0]);

/** A cubic animation curve that starts slowly and ends linearly.
 *
 * The symmetric animation to [linearToEaseOut].
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_to_linear.mp4)
 */
export const easeInToLinear = createEasingFunction([0.67, 0.03, 0.65, 0.09]);

/** A cubic animation curve that starts slowly and ends quickly. This is
 * similar to [Curves.easeIn], but with sinusoidal easing for a slightly less
 * abrupt beginning and end. Nonetheless, the result is quite gentle and is
 * hard to distinguish from [Curves.linear] at a glance.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_sine.mp4)
 */
export const easeInSine = createEasingFunction([0.47, 0.0, 0.745, 0.715]);

/** A cubic animation curve that starts slowly and ends quickly. Based on a
 * quadratic equation where `f(t) = t²`, this is effectively the inverse of
 * [Curves.decelerate].
 *
 * Compared to [Curves.easeInSine], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quad.mp4)
 */
export const easeInQuad = createEasingFunction([0.55, 0.085, 0.68, 0.53]);

/** A cubic animation curve that starts slowly and ends quickly. This curve is
 * based on a cubic equation where `f(t) = t³`. The result is a safe sweet
 * spot when choosing a curve for widgets animating off the viewport.
 *
 * Compared to [Curves.easeInQuad], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_cubic.mp4)
 */
export const easeInCubic = createEasingFunction([0.55, 0.055, 0.675, 0.19]);

/** A cubic animation curve that starts slowly and ends quickly. This curve is
 * based on a quartic equation where `f(t) = t⁴`.
 *
 * Animations using this curve or steeper curves will benefit from a longer
 * duration to avoid motion feeling unnatural.
 *
 * Compared to [Curves.easeInCubic], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quart.mp4)
 */
export const easeInQuart = createEasingFunction([0.895, 0.03, 0.685, 0.22]);

/** A cubic animation curve that starts slowly and ends quickly. This curve is
 * based on a quintic equation where `f(t) = t⁵`.
 *
 * Compared to [Curves.easeInQuart], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_quint.mp4)
 */
export const easeInQuint = createEasingFunction([0.755, 0.05, 0.855, 0.06]);

/** A cubic animation curve that starts slowly and ends quickly. This curve is
 * based on an exponential equation where `f(t) = 2¹⁰⁽ᵗ⁻¹⁾`.
 *
 * Using this curve can give your animations extra flare, but a longer
 * duration may need to be used to compensate for the steepness of the curve.
 *
 * Compared to [Curves.easeInQuint], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_expo.mp4)
 */
export const easeInExpo = createEasingFunction([0.95, 0.05, 0.795, 0.035]);

/** A cubic animation curve that starts slowly and ends quickly. This curve is
 * effectively the bottom-right quarter of a circle.
 *
 * Like [Curves.easeInExpo], this curve is fairly dramatic and will reduce
 * the clarity of an animation if not given a longer duration.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_circ.mp4)
 */
export const easeInCirc = createEasingFunction([0.6, 0.04, 0.98, 0.335]);

/** A cubic animation curve that starts slowly and ends quickly. This curve
 * is similar to [Curves.elasticIn] in that it overshoots its bounds before
 * reaching its end. Instead of repeated swinging motions before ascending,
 * though, this curve overshoots once, then continues to ascend.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_back.mp4)
 */
export const easeInBack = createEasingFunction([0.6, -0.28, 0.735, 0.045]);

/** A cubic animation curve that starts quickly and ends slowly.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out.mp4)
 */
export const easeOut = createEasingFunction([0.0, 0.0, 0.58, 1.0]);

/** A cubic animation curve that starts linearly and ends slowly.
 *
 * A symmetric animation to [easeInToLinear].
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_linear_to_ease_out)mp4}
 */
export const linearToEaseOut = createEasingFunction([0.35, 0.91, 0.33, 0.97]);

/** A cubic animation curve that starts quickly and ends slowly. This is
 * similar to [Curves.easeOut], but with sinusoidal easing for a slightly
 * less abrupt beginning and end. Nonetheless, the result is quite gentle and
 * is hard to distinguish from [Curves.linear] at a glance.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_sine.mp4)
 */
export const easeOutSine = createEasingFunction([0.39, 0.575, 0.565, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This is
 * effectively the same as [Curves.decelerate], only simulated using a cubic
 * bezier function.
 *
 * Compared to [Curves.easeOutSine], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quad.mp4)
 */
export const easeOutQuad = createEasingFunction([0.25, 0.46, 0.45, 0.94]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * a flipped version of [Curves.easeInCubic].
 *
 * The result is a safe sweet spot when choosing a curve for animating a
 * widget's position entering or already inside the viewport.
 *
 * Compared to [Curves.easeOutQuad], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_cubic.mp4)
 */
export const easeOutCubic = createEasingFunction([0.215, 0.61, 0.355, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * a flipped version of [Curves.easeInQuart].
 *
 * Animations using this curve or steeper curves will benefit from a longer
 * duration to avoid motion feeling unnatural.
 *
 * Compared to [Curves.easeOutCubic], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quart.mp4)
 */
export const easeOutQuart = createEasingFunction([0.165, 0.84, 0.44, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * a flipped version of [Curves.easeInQuint].
 *
 * Compared to [Curves.easeOutQuart], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_quint.mp4)
 */
export const easeOutQuint = createEasingFunction([0.23, 1.0, 0.32, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * a flipped version of [Curves.easeInExpo]. Using this curve can give your
 * animations extra flare, but a longer duration may need to be used to
 * compensate for the steepness of the curve.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_expo.mp4)
 */
export const easeOutExpo = createEasingFunction([0.19, 1.0, 0.22, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * effectively the top-left quarter of a circle.
 *
 * Like [Curves.easeOutExpo], this curve is fairly dramatic and will reduce
 * the clarity of an animation if not given a longer duration.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_circ.mp4)
 */
export const easeOutCirc = createEasingFunction([0.075, 0.82, 0.165, 1.0]);

/** A cubic animation curve that starts quickly and ends slowly. This curve is
 * similar to [Curves.elasticOut] in that it overshoots its bounds before
 * reaching its end. Instead of repeated swinging motions after ascending,
 * though, this curve only overshoots once.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_out_back.mp4)
 */
export const easeOutBack = createEasingFunction([0.175, 0.885, 0.32, 1.275]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out.mp4)
 */
export const easeInOut = createEasingFunction([0.42, 0.0, 0.58, 1.0]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This is similar to [Curves.easeInOut], but with sinusoidal easing
 * for a slightly less abrupt beginning and end.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_sine.mp4)
 */
export const easeInOutSine = createEasingFunction([0.445, 0.05, 0.55, 0.95]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInQuad] as the first
 * half, and [Curves.easeOutQuad] as the second.
 *
 * Compared to [Curves.easeInOutSine], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quad.mp4)
 */
export const easeInOutQuad = createEasingFunction([0.455, 0.03, 0.515, 0.955]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInCubic] as the first
 * half, and [Curves.easeOutCubic] as the second.
 *
 * The result is a safe sweet spot when choosing a curve for a widget whose
 * initial and final positions are both within the viewport.
 *
 * Compared to [Curves.easeInOutQuad], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_cubic.mp4)
 */
export const easeInOutCubic = createEasingFunction([0.645, 0.045, 0.355, 1.0]);

/** A cubic animation curve that starts slowly, speeds up shortly thereafter,
 * and then ends slowly. This curve can be imagined as a steeper version of
 * [easeInOutCubic].
 *
 * The result is a more emphasized eased curve when choosing a curve for a
 * widget whose initial and final positions are both within the viewport.
 *
 * Compared to [Curves.easeInOutCubic], this curve is slightly steeper.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation)curve_ease_in_out_cubic_emphasized.mp4}
 */
// static const ThreePointCubic easeInOutCubicEmphasized = ThreePointCubic(
// Offset(0.05, 0), Offset(0.133333, 0.06),
// Offset(0.166666, 0.4),
// Offset(0.208333, 0.82), Offset(0.25, 1),
// );

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInQuart] as the first
 * half, and [Curves.easeOutQuart] as the second.
 *
 * Animations using this curve or steeper curves will benefit from a longer
 * duration to avoid motion feeling unnatural.
 *
 * Compared to [Curves.easeInOutCubic], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quart.mp4)
 */
export const easeInOutQuart = createEasingFunction([0.77, 0.0, 0.175, 1.0]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInQuint] as the first
 * half, and [Curves.easeOutQuint] as the second.
 *
 * Compared to [Curves.easeInOutQuart], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_quint.mp4)
 */
export const easeInOutQuint = createEasingFunction([0.86, 0.0, 0.07, 1.0]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly.
 *
 * Since this curve is arrived at with an exponential function, the midpoint
 * is exceptionally steep. Extra consideration should be taken when designing
 * an animation using this.
 *
 * Compared to [Curves.easeInOutQuint], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_expo.mp4)
 */
export const easeInOutExpo = createEasingFunction([1.0, 0.0, 0.0, 1.0]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInCirc] as the first
 * half, and [Curves.easeOutCirc] as the second.
 *
 * Like [Curves.easeInOutExpo], this curve is fairly dramatic and will reduce
 * the clarity of an animation if not given a longer duration.
 *
 * Compared to [Curves.easeInOutExpo], this curve is slightly steeper.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_circ.mp4)
 */
export const easeInOutCirc = createEasingFunction([0.785, 0.135, 0.15, 0.86]);

/** A cubic animation curve that starts slowly, speeds up, and then ends
 * slowly. This curve can be imagined as [Curves.easeInBack] as the first
 * half, and [Curves.easeOutBack] as the second.
 *
 * Since two curves are used as a basis for this curve, the resulting
 * animation will overshoot its bounds twice before reaching its end - first
 * by exceeding its lower bound, then exceeding its upper bound and finally
 * descending to its final position.
 *
 * Derived from Robert Penner’s easing functions.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_ease_in_out_back.mp4)
 */
export const easeInOutBack = createEasingFunction([0.68, -0.55, 0.265, 1.55]);

// SnappyInSlowOut
export const snapInSlowOut = createEasingFunction([0.14, 0.82, 0.04, 0.98]);

// Smoothly Steep curve at Middle
export const smoothMiddle = createEasingFunction([0.4, 0, 0.2, 1]);

/** A curve that starts quickly and eases into its final position.
 *
 * Over the course of the animation, the object spends more time near its
 * final destination. As a result, the user isn’t left waiting for the
 * animation to finish, and the negative effects of motion are minimized.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_fast_out_slow_in.mp4)
 *
 * [standardEasing], the name for this curve in the Material specification.
 *
 */
export const slowInFastOut = createEasingFunction([0.4, 0.0, 0.2, 1.0]);

/** A cubic animation curve that starts quickly, slows down, and then ends
 * quickly.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_slow_middle.mp4)
 */
export const fastInSlowMiddle = createEasingFunction([0.15, 0.85, 0.85, 0.15]);

/** An oscillating curve that grows in magnitude.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_in.mp4)
 */
export const bounceIn = BounceIn();

/** An oscillating curve that first grows and then shrink in magnitude.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_out.mp4)
 */
export const bounceOut = BounceOut();

/** An oscillating curve that first grows and then shrink in magnitude.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_bounce_in_out.mp4)
 */
export const bounceInOut = BounceInOut();

/** An oscillating curve that grows in magnitude while overshooting its bounds.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_in.mp4)
 */
export const elasticIn = ElasticIn();

/** An oscillating curve that shrinks in magnitude while overshooting its bounds.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_out.mp4)
 */
export const elasticOut = ElasticOut();

/** An oscillating curve that grows and then shrinks in magnitude while overshooting its bounds.
 *
 * [link to video](https://flutter.github.io/assets-for-api-docs/assets/animation/curve_elastic_in_out.mp4)
 */
export const elasticInOut = ElasticInOut();

export const elegant = createEasingFunction([0.175, 0.885, 0.32, 1.275]);

// pretty sure, it looks like a spring cubic-bezier(1,1.67,0.72,-0.67);
