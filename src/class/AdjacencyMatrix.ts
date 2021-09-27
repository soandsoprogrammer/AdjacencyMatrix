class AdjacencyMatrix {
  vertex: string[] = []
  matrix: boolean[][] = []
  constructor(v: string[]) {
    this.vertex = v
    this.init()
  }
  private init() {
    const length = this.vertex.length
    this.matrix = Array.from(new Array(length),()=>new Array(length).fill(false))
  }
  setEdge (id:string, edges:string[]) {  // 设置点之间的关系
    const idIndex = this.vertex.indexOf(id)
    edges.forEach(i => {
      const index = this.vertex.indexOf(i)
      this.matrix[idIndex][index] = true
    })
  }
  getEdge (id: string) {  // 获得相邻点
    return this.matrix[this.vertex.indexOf(id)].map((i, index) => i ? this.vertex[index] : '').filter(Boolean)
  }
  getRowSum (ids: string[]) {
    const list = new Array(this.vertex.length).fill(0)
    ids.forEach(id => this.matrix[this.vertex.indexOf(id)].forEach((item, index) => list[index] += ~~item))
    return list
  }
  getUnions(ids: string[]) {  // 求交集
    const row = this.getRowSum(ids)
    return row.map((i, index) => i === ids.length && this.vertex[index]).filter(Boolean)
  }
  getCollection(ids: string[]) { // 求并集
    const row = this.getRowSum(ids)
    return row.map((i, index) => i && this.vertex[index]).filter(Boolean)
  }
}


export default AdjacencyMatrix