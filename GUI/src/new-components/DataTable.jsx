import React from "react";

const DataTable = ({
  headers = [],
  data = [],
  keyMapping = {},
  tableHeight = 250,
}) => {
  const equalColumnWidth = `${100 / headers.length}%`;

  return (
    <div className="data-table-container">
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            height: `${tableHeight}px`,
            overflowY: "auto",
          }}
        >
          <table
            className="table"
            style={{
              borderCollapse: "collapse",
              width: "100%",
              tableLayout: "fixed",
            }}
          >
            <colgroup>
              {headers.map((_, idx) => (
                <col key={idx} style={{ width: equalColumnWidth }} />
              ))}
            </colgroup>
            <thead>
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="num"
                    style={{
                      textAlign: header.align || "center",
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
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
                          whiteSpace: "normal",
                          wordBreak: "break-word",
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
