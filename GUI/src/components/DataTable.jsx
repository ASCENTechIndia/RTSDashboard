import React, { useRef, useEffect, useState } from "react";

const DataTable = ({
  headers = [],
  data = [],
  keyMapping = {},
  rowLimit = 7,
}) => {
  const [maxHeight, setMaxHeight] = useState("none");
  const tbodyRef = useRef(null);

  useEffect(() => {
    if (data.length > rowLimit && tbodyRef.current) {
      // Get the first row element
      const firstRow = tbodyRef.current.querySelector("tr");
      if (firstRow) {
        const rowHeight = firstRow.offsetHeight;
        // Set maxHeight to rowLimit * rowHeight (includes header height? We'll handle separately)
        // We need to include thead height as well. Better to set container height based on rows + header.
        const thead = document.querySelector(".data-table-container thead");
        const headerHeight = thead ? thead.offsetHeight : 0;
        const totalHeight = headerHeight + (rowLimit * rowHeight);
        setMaxHeight(totalHeight);
      }
    } else {
      setMaxHeight("none");
    }
  }, [data, rowLimit]);

  const hasScroll = data.length > rowLimit;

  return (
    <div className="data-table-container">
      <div style={{ overflowX: "auto" }}>
        <div
          style={{
            maxHeight: maxHeight === "none" ? "none" : `${maxHeight}px`,
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
                      textAlign: header.align || "center",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {header.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody ref={tbodyRef}>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {headers.map((header, colIndex) => {
                    const key = keyMapping[header.label] || header.label;
                    let value = row[key];
                    if (typeof value === "number" && header.label !== "प्रभाग") {
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
                          color: header.label === "वेळेत (%)" ? "#16a34a" : "inherit",
                          fontWeight: header.label === "वेळेत (%)" ? 600 : "normal",
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