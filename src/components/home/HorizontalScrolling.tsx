import { useState } from "react";

export function DraggableHorizontalScrolling(props: {
  children: any;
  className: string;
}) {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  function onMouseDown(e: any) {
    setIsDown(true);
    setStartX(e.pageX - e.currentTarget.offsetLeft);
    setScrollLeft(e.currentTarget.scrollLeft);
  }

  function onMouseLeave() {
    setIsDown(false);
  }

  function onMouseUp() {
    setIsDown(false);
  }

  function onMouseMove(e: any) {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - e.currentTarget.offsetLeft;
    const walk = (x - startX) * 3; //scroll-fast
    e.currentTarget.scrollLeft = scrollLeft - walk;
    console.log(walk);
  }
  return (
    <div
      className={props.className}
      onMouseDown={onMouseDown}
      onMouseLeave={onMouseLeave}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
    >
      {props.children}
    </div>
  );
}
