import * as setting from "./setting/setting.json";
import * as fs from "fs";
import * as path from "path";
import BigNumber from "bignumber.js";

type Setting = {
  startPosition: Position;
  tableBodyHeight: number;
  fontSize: number;
  rowCount: number;
  columnSettings: ColumnSetting[];
};

type ColumnSetting = {
  order: number;
  name: string;
  width: number;
  alignment: "right" | "left" | "middle";
};

type Schema = {
  type: string;
  content: string;
  position: Position;
  width: number;
  height: number;
  rotate: number;
  alignment: string;
  verticalAlignment: string;
  fontSize: number;
  lineHeight: number;
  characterSpacing: number;
  fontColor: string;
  backgroundColor: string;
  opacity: number;
  strikethrough: boolean;
  underline: boolean;
  required: boolean;
  fontName: string;
};

type Position = {
  x: number;
  y: number;
};

type Output = { [name: string]: Schema };

const createTableJson = (setting: Setting): Output => {
  const {
    startPosition: { x: startX, y: startY },
    tableBodyHeight,
    fontSize,
    rowCount,
    columnSettings,
  } = setting;
  const cellHeight = BigNumber(tableBodyHeight).div(rowCount);
  const output = [...Array(rowCount)].reduce((acc, _, index) => {
    const rowNumber = index + 1;
    const sortedColumnSettings = columnSettings.toSorted((a, b) =>
      a < b ? -1 : 1
    );
    sortedColumnSettings.forEach(({ name, width, alignment }, index, src) => {
      const x =
        startX +
        [...Array(index)].reduce((acc, _, index) => {
          acc += columnSettings[index].width;
          return acc;
        }, 0);
      const y = BigNumber(startY).plus(
        BigNumber(cellHeight).times(rowNumber - 1)
      );

      const position = { x, y };

      const schema = {
        type: "text",
        content: "",
        position,
        width,
        height: cellHeight,
        rotate: 0,
        alignment,
        verticalAlignment: "middle",
        fontSize,
        lineHeight: 1,
        characterSpacing: 0,
        fontColor: "#000000",
        backgroundColor: "",
        opacity: 1,
        strikethrough: false,
        underline: false,
        required: false,
        fontName: "NotoSerifJP-Regular",
      };
      acc[`${name}_${rowNumber}`] = schema;
    });

    return acc;
  }, {});
  return output;
};

const main = () => {
  const output = createTableJson(setting as Setting);
  fs.writeFileSync(
    path.join(__dirname, "output/output.json"),
    JSON.stringify(output)
  );
};

main();
