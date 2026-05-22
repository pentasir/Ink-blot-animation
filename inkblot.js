(function () {
  var scene, camera, renderer, plane, material, morphStart, introStart;
  var MORPH_MS = 29000;
  var SHAPE_COUNT = 6;
  var SHAPE_SIZE = 15;
  var INDEX_HALF = 400;
  var PIXEL_RATIO_CAP = 6;
  var RESOLUTION_MULT = 2;
  var currentShape = 0;

  var shapes = [
    [ { tx:   0, ty:  10, w: 120, h: 140 }, { tx: -95, ty:-130, w: 170, h: 120 }, { tx:  95, ty:-130, w: 170, h: 120 }, { tx:-155, ty:-150, w: 100, h:  95 }, { tx: 155, ty:-150, w: 100, h:  95 }, { tx:-130, ty: -25, w: 115, h:  95 }, { tx: 130, ty: -25, w: 115, h:  95 }, { tx: -85, ty: 125, w: 105, h: 125 }, { tx:  85, ty: 125, w: 105, h: 125 }, { tx:-175, ty: -75, w:  55, h:  60 }, { tx: 175, ty: -75, w:  55, h:  60 }, { tx: -55, ty: 215, w:  65, h:  75 }, { tx:  55, ty: 215, w:  65, h:  75 }, { tx:-140, ty:  95, w:  45, h:  50 }, { tx: 140, ty:  95, w:  45, h:  50 } ],
    [ { tx:   0, ty:   0, w: 100, h: 240 }, { tx: -90, ty:-140, w: 140, h: 120 }, { tx:  90, ty:-140, w: 140, h: 120 }, { tx:-120, ty:-120, w:  85, h:  90 }, { tx: 120, ty:-120, w:  85, h:  90 }, { tx:-100, ty:  40, w: 110, h: 100 }, { tx: 100, ty:  40, w: 110, h: 100 }, { tx: -75, ty: 180, w:  90, h: 110 }, { tx:  75, ty: 180, w:  90, h: 110 }, { tx:-165, ty: -60, w:  55, h:  60 }, { tx: 165, ty: -60, w:  55, h:  60 }, { tx: -55, ty: 230, w:  60, h:  70 }, { tx:  55, ty: 230, w:  60, h:  70 }, { tx:-145, ty:  95, w:  48, h:  52 }, { tx: 145, ty:  95, w:  48, h:  52 } ],
    [ { tx:   0, ty: -50, w: 140, h: 180 }, { tx: -80, ty:-160, w: 150, h: 150 }, { tx:  80, ty:-160, w: 150, h: 150 }, { tx:-110, ty:-130, w:  85, h:  95 }, { tx: 110, ty:-130, w:  85, h:  95 }, { tx:-100, ty:  20, w:  95, h: 120 }, { tx: 100, ty:  20, w:  95, h: 120 }, { tx: -75, ty: 175, w:  80, h: 100 }, { tx:  75, ty: 175, w:  80, h: 100 }, { tx:-145, ty: -60, w:  55, h:  60 }, { tx: 145, ty: -60, w:  55, h:  60 }, { tx: -50, ty: 250, w:  60, h:  70 }, { tx:  50, ty: 250, w:  60, h:  70 }, { tx:-130, ty: 120, w:  45, h:  50 }, { tx: 130, ty: 120, w:  45, h:  50 } ],
    [ { tx:   0, ty:   0, w: 100, h: 140 }, { tx:-140, ty: -60, w: 180, h: 140 }, { tx: 140, ty: -60, w: 180, h: 140 }, { tx:-200, ty: -90, w: 110, h: 100 }, { tx: 200, ty: -90, w: 110, h: 100 }, { tx:-185, ty:  50, w: 120, h:  90 }, { tx: 185, ty:  50, w: 120, h:  90 }, { tx:-120, ty: 150, w: 100, h: 110 }, { tx: 120, ty: 150, w: 100, h: 110 }, { tx:-235, ty: -25, w:  60, h:  55 }, { tx: 235, ty: -25, w:  60, h:  55 }, { tx: -70, ty: 210, w:  65, h:  75 }, { tx:  70, ty: 210, w:  65, h:  75 }, { tx:-205, ty: 115, w:  50, h:  48 }, { tx: 205, ty: 115, w:  50, h:  48 } ],
    [ { tx:   0, ty: -30, w: 160, h: 220 }, { tx: -60, ty:-140, w: 120, h: 120 }, { tx:  60, ty:-140, w: 120, h: 120 }, { tx:-130, ty: -40, w:  90, h: 100 }, { tx: 130, ty: -40, w:  90, h: 100 }, { tx:-100, ty:  90, w:  75, h:  95 }, { tx: 100, ty:  90, w:  75, h:  95 }, { tx: -55, ty: 200, w:  60, h:  70 }, { tx:  55, ty: 200, w:  60, h:  70 }, { tx:-165, ty: -100, w:  50, h:  55 }, { tx: 165, ty: -100, w:  50, h:  55 }, { tx:-120, ty: 170, w:  45, h:  50 }, { tx: 120, ty: 170, w:  45, h:  50 }, { tx:-180, ty:  30, w:  40, h:  42 }, { tx: 180, ty:  30, w:  40, h:  42 } ],
    [ { tx:   0, ty: -80, w: 280, h: 180 }, { tx:-120, ty: -120, w: 200, h: 140 }, { tx: 120, ty: -120, w: 200, h: 140 }, { tx:-180, ty: -80, w: 120, h: 100 }, { tx: 180, ty: -80, w: 120, h: 100 }, { tx: -90, ty:  60, w:  55, h: 110 }, { tx:  90, ty:  60, w:  55, h: 110 }, { tx: -55, ty: 180, w:  50, h: 100 }, { tx:  55, ty: 180, w:  50, h: 100 }, { tx:-230, ty: -50, w:  70, h:  65 }, { tx: 230, ty: -50, w:  70, h:  65 }, { tx: -35, ty: 250, w:  45, h:  80 }, { tx:  35, ty: 250, w:  45, h:  80 }, { tx:-140, ty:  40, w:  40, h:  85 }, { tx: 140, ty:  40, w:  40, h:  85 } ],
  ];

  function easeOutBezier(t) {
    return 3.0 * t - 3.0 * t * t + t * t * t;
  }

  var vertexShader = [
    'varying vec2 vUv;',
    'void main() {',
    '  vUv = uv;',
    '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
    '}'
  ].join('\n');

  var fragmentShader = [
    'precision highp float;',
    '#define TWO_PI 6.283185307',
    'uniform float uTime;',
    'uniform float uMorphPhase;',
    'uniform float uSymmetry;',
    'uniform float uShapeIndex;',
    'uniform vec2 uResolution;',
    'uniform float uEllipseTx[15];',
    'uniform float uEllipseTy[15];',
    'uniform float uEllipseW[15];',
    'uniform float uEllipseH[15];',
    'uniform float uCovStart;',
    'uniform float uCovEnd;',
    'uniform float uGapInk;',
    'uniform float uEdgeBand;',
    'uniform float uInkContour;',
    'uniform float uIntro;',
    'varying vec2 vUv;',
    '',
    'vec3 random3(vec3 i) {',
    '  const vec3 seed1 = vec3(31.06, 19.86, 30.19);',
    '  const vec3 seed2 = vec3(6640.0, 5790.4, 10798.861);',
    '  return fract(sin(dot(i, seed1)) * seed2) - 0.5;',
    '}',
    '',
    'float gradientNoise3(vec3 coords) {',
    '  vec3 fi = floor(coords);',
    '  vec3 ff = fract(coords);',
    '  vec3 c000 = fi + vec3(0.0, 0.0, 0.0);',
    '  vec3 c001 = fi + vec3(0.0, 0.0, 1.0);',
    '  vec3 c010 = fi + vec3(0.0, 1.0, 0.0);',
    '  vec3 c011 = fi + vec3(0.0, 1.0, 1.0);',
    '  vec3 c100 = fi + vec3(1.0, 0.0, 0.0);',
    '  vec3 c101 = fi + vec3(1.0, 0.0, 1.0);',
    '  vec3 c110 = fi + vec3(1.0, 1.0, 0.0);',
    '  vec3 c111 = fi + vec3(1.0, 1.0, 1.0);',
    '  float n000 = dot(random3(c000), coords - c000);',
    '  float n001 = dot(random3(c001), coords - c001);',
    '  float n010 = dot(random3(c010), coords - c010);',
    '  float n011 = dot(random3(c011), coords - c011);',
    '  float n100 = dot(random3(c100), coords - c100);',
    '  float n101 = dot(random3(c101), coords - c101);',
    '  float n110 = dot(random3(c110), coords - c110);',
    '  float n111 = dot(random3(c111), coords - c111);',
    '  vec3 t = ff * ff * ff * (ff * (6.0 * ff - 15.0) + 10.0);',
    '  float nx00 = mix(n000, n100, t.x);',
    '  float nx01 = mix(n001, n101, t.x);',
    '  float nx10 = mix(n010, n110, t.x);',
    '  float nx11 = mix(n011, n111, t.x);',
    '  float nxy0 = mix(nx00, nx10, t.y);',
    '  float nxy1 = mix(nx01, nx11, t.y);',
    '  return mix(nxy0, nxy1, t.z);',
    '}',
    '',
    'float layeredNoise(vec3 coords) {',
    '  float result = 0.0;',
    '  float amplitude = 0.5;',
    '  float scale = 2.5;',
    '  for (int i = 0; i < 5; i++) {',
    '    result += amplitude * gradientNoise3(coords * scale);',
    '    amplitude *= 0.5;',
    '    scale *= 2.3;',
    '  }',
    '  return result;',
    '}',
    '',
    'float hash(vec2 p) {',
    '  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);',
    '}',
    'float noise2(vec2 p) {',
    '  vec2 i = floor(p);',
    '  vec2 f = fract(p);',
    '  f = f * f * (3.0 - 2.0 * f);',
    '  return mix(mix(hash(i), hash(i + vec2(1,0)), f.x), mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);',
    '}',
    '',
    'void main() {',
    '  vec2 uv = vUv;',
    '  vec2 centered = (uv - 0.5) * 2.0;',
    '  float dist = length(centered);',
    '  centered.x = abs(centered.x);',
    '  vec2 symUV = (centered + 1.0) * 0.5;',
    '  float phaseSin = sin(TWO_PI * uMorphPhase);',
    '  float shapeZ = uShapeIndex * 0.55;',
    '  float shapeScale = 0.06 * uShapeIndex;',
    '  float scale = 2.65 + shapeScale + 0.08 * (1.0 + phaseSin);',
    '  float zSlice = 0.012 * uTime + 0.4 * phaseSin + shapeZ;',
    '  vec3 coordsRorschach = vec3(symUV * scale, zSlice);',
    '  float noiseRorschach = layeredNoise(coordsRorschach) + 0.5;',
    '  float supportPhase = 0.5 * phaseSin;',
    '  vec3 coordsSupport = vec3(uv * 12.0, 0.015 * uTime + supportPhase);',
    '  float noiseSupport = gradientNoise3(coordsSupport);',
    '  float fold = 1.0 - smoothstep(0.0, 0.15, abs(uv.x - 0.5));',
    '  float supportFactor = (0.02 + 0.06 * fold) * (1.0 - uSymmetry);',
    '  float n = noiseRorschach + supportFactor * noiseSupport;',
    '  float thresh = 0.5 + 0.008 * phaseSin;',
    '  float paper = noise2(uv * 8.0 + uTime * 0.003) * 0.03;',
    '  thresh += paper;',
    '  float ink = smoothstep(thresh - uInkContour, thresh + uInkContour, n);',
    '  float vigInner = mix(0.08, 0.42, uIntro);',
    '  float vigOuter = mix(0.22, 0.88, uIntro);',
    '  float edgeFade = 1.0 - smoothstep(vigInner, vigOuter, dist);',
    '  ink *= edgeFade;',
    '  vec2 px = (uv - 0.5) * 2.0;',
    '  float iScale = max(uIntro, 0.06);',
    '  float ellipseMask = 0.0;',
    '  for (int i = 0; i < 15; i++) {',
    '    float dx = px.x - uEllipseTx[i] * iScale;',
    '    float dy = px.y - uEllipseTy[i] * iScale;',
    '    float rx = uEllipseW[i] * 0.5 * iScale;',
    '    float ry = uEllipseH[i] * 0.5 * iScale;',
    '    float d = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);',
    '    float cov = 1.0 - smoothstep(uCovStart, uCovEnd, d);',
    '    ellipseMask = max(ellipseMask, cov);',
    '  }',
    '  ink *= uGapInk + (1.0 - uGapInk) * ellipseMask;',
    '  vec3 white = vec3(0.98);',
    '  vec3 black = vec3(0.0);',
    '  float inkCore = smoothstep(uEdgeBand, 1.0, ink);',
    '  float inkEdge = smoothstep(0.0, uEdgeBand, ink);',
    '  vec3 col = mix(white, black, smoothstep(0.1, 1.0, inkEdge));',
    '  col = mix(col, black, inkCore);',
    '  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);',
    '}'
  ].join('\n');

  function getBlobSize() {
    var max = Math.min(880, Math.min(window.innerWidth, window.innerHeight) * 0.88);
    return Math.max(200, Math.min(880, max));
  }

  var ellipseTx = new Float32Array(SHAPE_SIZE);
  var ellipseTy = new Float32Array(SHAPE_SIZE);
  var ellipseW = new Float32Array(SHAPE_SIZE);
  var ellipseH = new Float32Array(SHAPE_SIZE);

  function updateEllipseUniforms(shapeIndexA, shapeIndexB, blend) {
    var sA = shapes[shapeIndexA];
    var sB = shapes[shapeIndexB];
    if (!sA || !sB) return;
    var b = easeOutBezier(blend);
    for (var i = 0; i < SHAPE_SIZE; i++) {
      ellipseTx[i] = (sA[i].tx + (sB[i].tx - sA[i].tx) * b) / INDEX_HALF;
      ellipseTy[i] = (sA[i].ty + (sB[i].ty - sA[i].ty) * b) / INDEX_HALF;
      ellipseW[i] = (sA[i].w + (sB[i].w - sA[i].w) * b) / INDEX_HALF;
      ellipseH[i] = (sA[i].h + (sB[i].h - sA[i].h) * b) / INDEX_HALF;
    }
    if (material && material.uniforms) {
      material.uniforms.uEllipseTx.value = ellipseTx;
      material.uniforms.uEllipseTy.value = ellipseTy;
      material.uniforms.uEllipseW.value = ellipseW;
      material.uniforms.uEllipseH.value = ellipseH;
    }
  }

  function init() {
    var container = document.getElementById('blob-container');
    if (!container) return;

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    var displaySize = getBlobSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * RESOLUTION_MULT, PIXEL_RATIO_CAP));
    renderer.setSize(displaySize, displaySize);
    renderer.setClearColor(0xfafaf8, 1);
    var canvas = renderer.domElement;
    container.appendChild(canvas);
    var bufferW = canvas.drawingBufferWidth;
    var bufferH = canvas.drawingBufferHeight;

    material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uMorphPhase: { value: 0 },
        uSymmetry: { value: 1.0 },
        uShapeIndex: { value: 0 },
        uEllipseTx: { value: ellipseTx },
        uEllipseTy: { value: ellipseTy },
        uEllipseW: { value: ellipseW },
        uEllipseH: { value: ellipseH },
        uResolution: { value: new THREE.Vector2(bufferW, bufferH) },
        uCovStart: { value: 0.47 },
        uCovEnd: { value: 1.12 },
        uGapInk: { value: 0.34 },
        uEdgeBand: { value: 0.16 },
        uInkContour: { value: 0.055 },
        uIntro: { value: 0.0 }
      }
    });
    updateEllipseUniforms(0, 1, 0);

    plane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(plane);

    window.addEventListener('resize', onResize);

    initSliders(container);
    morphStart = performance.now() * 0.001;
    introStart = morphStart;
    startAnimation();
  }

  function initSliders(container) {
    var wrapper = container.parentElement;
    var sliderContainer = document.getElementById('slider-container');
    if (!sliderContainer) return;

    var SLIDER_DEFS = [
      { key: 'speed',      label: 'Speed (s)',     min: 8,    max: 60,   step: 1,     val: MORPH_MS / 1000 },
      { key: 'covStart',   label: 'Ellipse Start', min: 0.30, max: 0.80, step: 0.01,  val: 0.47 },
      { key: 'covEnd',     label: 'Ellipse End',   min: 0.70, max: 1.30, step: 0.01,  val: 1.12 },
      { key: 'gapInk',     label: 'Gap Ink',       min: 0.00, max: 0.40, step: 0.01,  val: 0.34 },
      { key: 'edgeBand',   label: 'Edge Band',     min: 0.10, max: 0.50, step: 0.01,  val: 0.16 },
      { key: 'inkContour', label: 'Ink Contour',   min: 0.04, max: 0.16, step: 0.005, val: 0.055 },
      { key: 'cssBlur',    label: 'CSS Blur (px)', min: 0,    max: 40,   step: 1,     val: 6 },
      { key: 'cssContrast',label: 'CSS Contrast',  min: 5,    max: 30,   step: 1,     val: 9 },
    ];

    SLIDER_DEFS.forEach(function (def) {
      var row = document.createElement('div');
      row.className = 'sr';
      var lbl = document.createElement('label');
      lbl.textContent = def.label;
      var inp = document.createElement('input');
      inp.type = 'range'; inp.min = def.min; inp.max = def.max; inp.step = def.step; inp.value = def.val;
      var valSpan = document.createElement('span');
      valSpan.className = 'val';
      valSpan.textContent = String(def.val);
      row.appendChild(lbl); row.appendChild(inp); row.appendChild(valSpan);
      sliderContainer.appendChild(row);

      inp.addEventListener('input', function () {
        var v = parseFloat(inp.value);
        valSpan.textContent = String(v);
        if (def.key === 'speed') {
          MORPH_MS = v * 1000;
        } else if (def.key === 'cssBlur' || def.key === 'cssContrast') {
          var blur = sliderContainer.querySelector('[data-key="cssBlur"]').value;
          var con = sliderContainer.querySelector('[data-key="cssContrast"]').value;
          wrapper.style.filter = 'blur(' + blur + 'px) contrast(' + con + ')';
        } else if (material && material.uniforms) {
          var uName = 'u' + def.key.charAt(0).toUpperCase() + def.key.slice(1);
          material.uniforms[uName].value = v;
        }
      });
      inp.setAttribute('data-key', def.key);
    });
  }

  function onResize() {
    var container = document.getElementById('blob-container');
    if (!renderer || !container || !material) return;
    var displaySize = getBlobSize();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio * RESOLUTION_MULT, PIXEL_RATIO_CAP));
    renderer.setSize(displaySize, displaySize);
    var canvas = renderer.domElement;
    if (material.uniforms.uResolution) {
      material.uniforms.uResolution.value.set(canvas.drawingBufferWidth, canvas.drawingBufferHeight);
    }
  }

  var INTRO_DURATION = 3.0;

  function animate() {
    requestAnimationFrame(animate);
    if (!material || !renderer) return;
    var now = performance.now() * 0.001;

    var introElapsed = now - introStart;
    var introRaw = Math.min(introElapsed / INTRO_DURATION, 1.0);
    material.uniforms.uIntro.value = 1.0 - Math.pow(1.0 - introRaw, 3.0);

    var cycle = (now - morphStart) / (MORPH_MS / 1000);
    var t = cycle % 1.0;
    var segment = 1 / SHAPE_COUNT;
    currentShape = Math.min(Math.floor(t / segment), SHAPE_COUNT - 1);
    var nextShape = (currentShape + 1) % SHAPE_COUNT;
    var blend = (t - currentShape * segment) / segment;
    updateEllipseUniforms(currentShape, nextShape, blend);
    material.uniforms.uTime.value = now;
    material.uniforms.uMorphPhase.value = easeOutBezier(t);
    material.uniforms.uShapeIndex.value = currentShape + easeOutBezier(blend);
    renderer.render(scene, camera);
  }

  function startAnimation() {
    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
