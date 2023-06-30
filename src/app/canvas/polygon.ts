const PI2 = Math.PI * 2;

export class Polygon {
  private x: number;
  private y: number;
  private radius: number;
  private sides: number;
  private rotate: number;

  constructor(x: number, y: number, radius: number, sides: number) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.sides = sides;
    this.rotate = 0;
  }

  animate(ctx: any) {
    ctx.save();
    ctx.fillStyle = "#FFD662";
    ctx.beginPath();
    this.x += 0.1
    this.y += 0.1
    const angle = PI2 / this.sides;

    ctx.translate(this.x, this.y);

    for (let i = 0; i < this.sides; i++) {
      const x = this.radius * Math.cos(angle * i);
      const y = this.radius * Math.sin(angle * i);

      i == 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }

    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}