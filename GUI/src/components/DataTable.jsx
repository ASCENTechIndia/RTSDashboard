import React from "react";

const DataTable = ({
  headers = [], 
  data = [],
  keyMapping = {},
  rowLimit = 7,
}) => {
  const displayData = data.slice(0, rowLimit);
  const hasScroll = data.length > rowLimit;

  return (
    <div>
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            maxHeight: hasScroll ? "400px" : "none",
            overflowY: hasScroll ? "auto" : "visible",
          }}
        >
          <table
            className="table"
            style={{ borderCollapse: "collapse", width: "100%" }}
          >
            <colgroup>
              {headers.map((_, idx) => (
                <col key={idx} style={{ width: idx === 0 ? "34%" : "auto" }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="num"
                    style={{
                      textAlign: header?.align || "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => {
                    const key = keyMapping[header.label] || header.label;
                    let value = row[key];
                    if (
                      typeof value === "number" &&
                      header.label !== "प्रभाग"
                    ) {
                      value = value.toLocaleString("en-IN");
                    }
                    if (header.label === "वेळेत (%)" && value !== undefined) {
                      value = `${value}%`;
                    }
                    return (
                      <td
                        key={colIndex}
                        className="num"
                        style={{
                          textAlign: header.align || "center",
                          color:
                            header.label === "वेळेत (%)"
                              ? "#16a34a"
                              : "inherit",
                          fontWeight:
                            header.label === "वेळेत (%)" ? 600 : "normal",
                        }}
                      >
                        {value}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
