import { glsl } from "../utils/glsl-utils";

export const vertex_shader_source = glsl`
  attribute vec4 a_Position;
  attribute float a_PointSize;

  void main() {
    gl_Position = a_Position;
    gl_PointSize = a_PointSize;
  }
`;

export const fragment_shader_source = glsl`
  precision mediump float;
  uniform vec4 u_FragColor;

  void main() {
    gl_FragColor = u_FragColor;
  }
`