class Box {
  constructor(value) {
    this.pos = 0;
    this.value = value;
    this.dom = this.createDom();
  }
  createDom() {
    const div = document.createElement("div");
    div.className = "box";
    div.innerText = this.value;
    return div;
  }
}

const container = document.querySelector(".container");
class Container {
  constructor(elem, arr) {
    this.container = elem;
    this.arr = arr;
    this.boxes = [];
    this.delay = (ms) => new Promise((res) => setTimeout(res, ms));
  }
  draw() {
    for (const i of this.arr) {
      const b = new Box(i);
      b.dom.style.height = `${b.value * 16}px`;
      $(this.container).append(b.dom);
      this.boxes.push(b);
    }
  }

  swap(idx1, idx2) {
    const left = this.boxes[idx1];
    left.dom.classList.add("check");
    const right = this.boxes[idx2];
    const temp = this.boxes[idx1];
    this.boxes[idx1] = this.boxes[idx2];
    this.boxes[idx2] = temp;
    // console.log(left);
    left.pos += $(left.dom).outerWidth() + 8;
    $(left.dom).animate({
      left: `${left.pos}px`,
    });
    right.pos -= $(right.dom).outerWidth() + 8;
    $(right.dom).animate({
      left: `${right.pos}px`,
    });
  }
  x = 0;
  sort = async () => {
    for (let i = 0; i < this.arr.length; i++) {
      for (let j = 0; j < this.arr.length - i - 1; j++) {
        $(this.boxes[j].dom).addClass("check");
        $(this.boxes[j + 1].dom).addClass("check");
        if (this.arr[j + 1] < this.arr[j]) {
          await this.delay(500);
          this.swap(j, j + 1);
          const temp = this.arr[j + 1];
          this.arr[j + 1] = this.arr[j];
          this.arr[j] = temp;
        }
        await this.delay(500);
        $(this.boxes[j].dom).removeClass("check");
        $(this.boxes[j + 1].dom).removeClass("check");
      }
      $(this.boxes[this.arr.length - 1 - i].dom).addClass("sorted");
    }
    console.log("Finished");
  };
}
c = new Container(container, [1, 3, 10, 9, 8, 7, 6, 5, 4]);
c.draw();
$("#swap").click(() => {
  c.sort();
});

$("#reset").click(() => {
  $(".box").remove();
  c = new Container(container, [1, 3, 10, 9, 8, 7, 6, 5, 4]);
  //   c.boxes = [];
  c.draw();
});
