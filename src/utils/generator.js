const color_list = [
  '#ff9800', '#f44336', '#ffc107',
  '#cddc39', '#8bc34a', '#00bcd4',
  '#03a9f4', '#ffeb3b', '#fffde7',
]

export function Color(seed = Math.random()) {
  return color_list[~~(color_list.length * seed)]
}

