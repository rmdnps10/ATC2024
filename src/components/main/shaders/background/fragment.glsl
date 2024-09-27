uniform vec3 iResolution;
uniform float iTime;

mat2 n(float a) {
    float b = sin(a), c = cos(a);
    return mat2(c, b, -b, c);
}

const mat2 z = mat2(-1.1, -.4, .3, 1);
float A(in vec2 a) { return sin(a.x) * sin(a.y); }
float o(vec2 b) {
    float c = 0.;
    for (float a = 0.; a < 5.; a++)
        c += .15 * A(b * a), b = z * b * abs(a - 2.) * 2.3;
    return c / 1.;
}
vec2 h(vec2 a) { return vec2(o(a), o(a + vec2(7.8))); }
float p(vec3 b, int d) {
    vec3 a = b;
    float c = length(a) - .5 + h(a.yz - iTime * .2).y * 1.5 * h(a.xz - iTime * .2).x * 1. * cos(a).y * 1. * .6;
    return c;
}
float e(vec3 a) { vec3 b = a; float c = p(b, 1); return c; }
vec3 q(in vec3 b) {
    vec2 a = vec2(1, -1) * .5773;
    return normalize(
        a.xyy * e(b + a.xyy * 5e-4) +
        a.yyx * e(b + a.yyx * 5e-4) +
        a.yxy * e(b + a.yxy * 5e-4) +
        a.xxx * e(b + a.xxx * 5e-4)
    );
}

void mainImage(out vec4 U, in vec2 V) {
    vec2 a = V.xy / iResolution.y;
    a.x -= (iResolution.x - iResolution.y) / iResolution.y * .5;
    float i = iTime * 0.4;
    a = (a - 0.5) * 1.35;
    vec3 b = vec3(cos(i) * -1.2, 0, sin(i) * -1.2), r = vec3(0, 0, 0);
    b = vec3(0, 0, -1);
    vec3 c = normalize(r - b), j = normalize(cross(c, vec3(0, 1, 0))), s = normalize(cross(j, c)), m = vec3(0), d = normalize(a.x * j + a.y * s + 1.5 * c);
    float f = 0.;
    for (int t = 0; t < 5; ++t) {
        vec3 u = b + d * f;
        float B = e(u);
        f += B * .9999;
    }
    vec3 k = vec3(0), l = normalize(vec3(.57703));
    l.yz *= n(-iTime * 0.5);
    l.xy *= n(iTime * 0.5);
    vec3 v = normalize(l - d);
    if (f < 5.) {
        vec3 w = b + f * d, g = q(w);
        float x = clamp(dot(g, vec3(.4, 1, -.5)), 0., 1.), y = pow(clamp(dot(g, v), 0., 1.), 125.) * 0.6;
        y *= x;
        float C = dot(g, vec3(0, 1, 0));
        k = y + vec3(.1) * C + vec3(.5) * x + vec3(.5);
    }
    k = sqrt(k);
    m += k;
    m *= 0.7 + 0.3 * cos(iTime + a.xyx + vec3(0, 2, 4));
    U = vec4(m, 1.);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}
