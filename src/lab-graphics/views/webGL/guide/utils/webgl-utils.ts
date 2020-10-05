import loader from "vue-loader";

export type WebGLContext = WebGLRenderingContext | WebGL2RenderingContext
export enum WebGLShaderType {
  VERTEX_SHADER = WebGLRenderingContext.VERTEX_SHADER,
  FRAGMENT_SHADER = WebGLRenderingContext.FRAGMENT_SHADER
}

const log = (error: string) : void => {
  console.log(`%c[webgl-utils][${(new Error).stack}] \n ${error}`, 'color: red')
}

/**
 * Create a program object and make current
 * 1. createShader  2. shaderSource  3. compileShader
 * 4. createProgram  5. attachShader
 * 6. linkProgram
 * 7. useProgram
 * @param {WebGLRenderingContext} gl WebGL context
 * @param {string} vertex_shader a GLSL vertex shader program string 
 * @param {string} fragment_shader a GLSL fragment shader program string
 */
export function initShaders(gl: WebGLContext, vertex_shader: string, fragment_shader: string) {
  let program = createProgram(gl, vertex_shader, fragment_shader);
  if (program) {
    gl.useProgram(program);
  }
}

/**
 * Create a linked program object
 * 1. createShader  2. shaderSource  3. compileShader
 * @param {WebGLRenderingContext} gl WebGL context
 * @param {string} vertex_shader a GLSL vertex shader program string 
 * @param {string} fragment_shader a GLSL fragment shader program string
 */
function createProgram(
  gl: WebGLContext, 
  vertex_shader: string, 
  fragment_shader: string
): WebGLProgram|null {
  /** Create shader */
  let vertexShader = loadShader(gl, WebGLShaderType.VERTEX_SHADER, vertex_shader);
  let fragmentShader = loadShader(gl, WebGLShaderType.FRAGMENT_SHADER, fragment_shader);
  if (!vertexShader || !fragmentShader) {
    return null;
  }

  /** Create program */
  let program = gl.createProgram();
  if (!program) { return null; }

  /** Attach shader */
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  /** Link program */
  gl.linkProgram(program);
  let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linked) {
    let error = gl.getProgramInfoLog(program);
    log('Failed to link program: ' + error);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertexShader);
    return null;
  }

  return program;
}

/**
 * Create a shader object
 * @param gl GL context
 * @param type the type of the shader object to be created
 * @param source shader program (string)
 * @return created shader object, or null if the creation has failed.
 */
function loadShader(gl: WebGLContext, type: WebGLShaderType , source: string) {
  // Create shader object
  var shader = gl.createShader(type);
  if (shader == null) {
    log('unable to create shader');
    return null;
  }

  // Set the shader program
  gl.shaderSource(shader, source);

  // Compile the shader
  gl.compileShader(shader);

  // Check the result of compilation
  var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!compiled) {
    var error = gl.getShaderInfoLog(shader);
    log('Failed to compile shader: ' + error);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}