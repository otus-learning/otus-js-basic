import React, { useState, useCallback } from "react";
import { HLev } from "./hLev/hLev";
import { P } from "./p/p";
import { Summary } from "./sum/sum";
import { Hr } from "./hr/hr";
import { Img } from "./img/img";
import { Input } from "./input/input";
import { Lbl } from "./lbl/lbl";
import { Btn } from "./btn/btn";
import uniqid from "uniqid";

export const App = () => {
  const [el, setEl] = useState(new Array<JSX.Element>(0));
  const [type, setType] = useState("0");

  const getInputValue = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setType(e.target.value);
    },
    []
  );
  const chooseType = useCallback(() => {
    switch (Number(type)) {
      case 0: {
        const lev = Number(prompt("Введите уровень заголовка"));
        const txt = prompt("Введите текст заголовка") || "";
        const color =
          prompt("Введите цвет текста (Red / Green / Blue...)") || "Red";
        setEl(() => [
          ...el,
          <HLev level={lev} color={color} text={txt} key={uniqid()} />,
        ]);
        break;
      }
      case 1: {
        const txt = prompt("Введите текст параграфа") || "";
        const color =
          prompt("Введите цвет текста (Red / Green / Blue...)") || "Red";
        setEl(() => [...el, <P text={txt} color={color} key={uniqid()} />]);
        break;
      }
      case 2: {
        const hdr = prompt("Введите открытое текстовое поле") || "";
        const txt = prompt("Введите скрытое текстовое поле") || "";
        const color =
          prompt("Введите цвет текста (Red / Green / Blue...)") || "Red";
        setEl(() => [
          ...el,
          <Summary hdr={hdr} text={txt} color={color} key={uniqid()} />,
        ]);
        break;
      }
      case 3: {
        const before = prompt("Введите количество строк до черты") || "0";
        const after = prompt("Введите количество строк после черты") || "0";
        setEl(() => [
          ...el,
          <Hr key={uniqid()} before={before} after={after} />,
        ]);
        break;
      }
      case 4: {
        const src = prompt("Введите ссылку на картинку") || "";
        const txt = prompt("Введите альтернативный текст для картинки") || "";
        setEl(() => [...el, <Img src={src} text={txt} key={uniqid()} />]);
        break;
      }
      default: {
        setEl(() => [...el, <label key={uniqid()}> Error </label>]);
      }
    }
  }, [type]);

  return (
    <>
      <Lbl text={"Введите тип компонента"} />
      <Lbl
        text={
          "(0 - заголовок, 1 - параграф, 2 - раскрывающийся блок, 3 - горизонтальная черта (пробельный блок), 4 - изображение):"
        }
      />
      <Input type={type} onchg={getInputValue} />
      <Btn onclck={chooseType} name={"Выбрать тип"} />
      {el.length ? el : null}
    </>
  );
};
