import React, { useState } from "react";
import "./index.css"; // Assuming your CSS file is called 'index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";


const StockTable = () => {
    const [rows, setRows] = useState([
        { id: 1, item: "Rosa", startingStockPack: 0, startingStockPiece: 0, costPrice: 29.20, sellingPrice: 50, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 2, item: "Coca Cola", startingStockPack: 0, startingStockPiece: 0, costPrice: 29.41, sellingPrice: 70, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 3, item: "Coca Cola Zero", startingStockPack: 0, startingStockPiece: 0, costPrice: 24.42, sellingPrice: 70, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 4, item: "Skopsko", startingStockPack: 0, startingStockPiece: 0, costPrice: 39.42, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 5, item: "Skopsko Smooth", startingStockPack: 0, startingStockPiece: 0, costPrice: 47, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 6, item: "Johnny", startingStockPack: 0, startingStockPiece: 0, costPrice: 48.33, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 288 },
        { id: 7, item: "Smirnoff", startingStockPack: 0, startingStockPiece: 0, costPrice: 34.58, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 288 },
        { id: 8, item: "Gordons", startingStockPack: 0, startingStockPiece: 0, costPrice: 41.25, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 288 },

        { id: 9, item: "Gordons+tonic", startingStockPack: 0, startingStockPiece: 0, costPrice: 200, sellingPrice: 200, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 10, item: "Tonic", startingStockPack: 0, startingStockPiece: 0, costPrice: 5.77, sellingPrice: 50, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 60 },

        { id: 11, item: "Schweps", startingStockPack: 0, startingStockPiece: 0, costPrice: 28.25, sellingPrice: 70, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 12, item: "Fuse Tea", startingStockPack: 0, startingStockPiece: 0, costPrice: 28.25, sellingPrice: 80, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 12 },
        { id: 13, item: "Heineken", startingStockPack: 0, startingStockPiece: 0, costPrice: 48.13, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 14, item: "Red Bull", startingStockPack: 0, startingStockPiece: 0, costPrice: 77, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 15, item: "Captain Morgan", startingStockPack: 0, startingStockPiece: 0, costPrice: 48.12, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 96 },
        { id: 16, item: "Sprite", startingStockPack: 0, startingStockPiece: 0, costPrice: 5.34, sellingPrice: 50, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 60 },
        { id: 17, item: "Coca-Cola Golemo", startingStockPack: 0, startingStockPiece: 0, costPrice: 7.37, sellingPrice: 50, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 60 },

        { id: 18, item: "Skopsko Toceno", startingStockPack: 0, startingStockPiece: 0, costPrice: 53.19, sellingPrice: 120, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 60 },
        { id: 20, item: "Magic Basic Kikiriki", startingStockPack: 0, startingStockPiece: 0, costPrice: 40, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 14 },
        { id: 21, item: "Magic Basic Bademi", startingStockPack: 0, startingStockPiece: 0, costPrice: 40, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 14 },
        { id: 22, item: "Magic Basic Mix", startingStockPack: 0, startingStockPiece: 0, costPrice: 40, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 14 },

    ]);

    const addRow = () => {
        const newRow = {
            id: rows.length + 1,
            item: "",
            startingStockPack: 0,
            startingStockPiece: 0,
            costPrice: 0,
            sellingPrice: 0,
            returnedStockPack: 0,
            returnedPieces: 0,
            soldStockPack: 0,
            soldPieces: 0,
            totalSales: 0,
            packageSize: 12,
        };
        setRows([...rows, newRow]);
    };

    const deleteRow = (id) => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleInputChange = (id, field, value) => {
        const updatedRows = rows.map((row) => {
            if (row.id === id) {
                const newValue = field === "item" ? value : Number(value);
                const updatedRow = { ...row, [field]: newValue };

                // When packageSize changes, adjust stock values
                if (field === "packageSize") {
                    updatedRow.startingStockPack = Math.floor(updatedRow.startingStockPiece / updatedRow.packageSize);
                    updatedRow.returnedStockPack = Math.floor(updatedRow.returnedPieces / updatedRow.packageSize);
                    updatedRow.soldStockPack = Math.floor(updatedRow.soldPieces / updatedRow.packageSize);
                }

                // Update starting stock calculations
                if (field === "startingStockPack") {
                    updatedRow.startingStockPiece = updatedRow.startingStockPack * updatedRow.packageSize;
                }
                if (field === "startingStockPiece") {
                    updatedRow.startingStockPack = Math.floor(updatedRow.startingStockPiece / updatedRow.packageSize);
                }

                // Update returned stock calculations
                if (field === "returnedStockPack") {
                    updatedRow.returnedPieces = updatedRow.returnedStockPack * updatedRow.packageSize;
                }
                if (field === "returnedPieces") {
                    updatedRow.returnedStockPack = Math.floor(updatedRow.returnedPieces / updatedRow.packageSize);
                }

                // Calculate sold stock in pieces
                const totalStartingPieces = updatedRow.startingStockPiece || 0;
                const totalReturnedPieces = updatedRow.returnedPieces || 0;
                updatedRow.soldPieces = Math.max(0, totalStartingPieces - totalReturnedPieces);
                updatedRow.soldStockPack = Math.floor(updatedRow.soldPieces / updatedRow.packageSize);

                // Calculate total sales
                updatedRow.totalSales = (updatedRow.soldPieces * (updatedRow.sellingPrice || 0)).toFixed(2);

                return updatedRow;
            }
            return row;
        });

        setRows(updatedRows);
    };


    // Calculate profit and equation for each item
    const calculateProfit = () => {
        return rows.map((row) => {
            const profit = (row.sellingPrice - row.costPrice) * row.soldPieces;
            const equation = `(${row.sellingPrice} - ${row.costPrice}) * ${row.soldPieces} = ${profit.toFixed(2)}`;
            return {
                id: row.id,
                item: row.item,
                equation: equation,
                profit: profit.toFixed(2),
            };
        });
    };

    // Calculate total profit
    const totalProfit = calculateProfit().reduce((sum, item) => sum + parseFloat(item.profit), 0).toFixed(2);
    // Function to export to Excel
    const exportToExcel = () => {
        // Define custom column headers for the stock data
        const stockHeaders = [
            { header: "РОБА", key: "item" },
            { header: "ПОЧЕТНА КОЛИЧИНА по пакет", key: "startingStockPack" },
            { header: "ПОЧЕТНА КОЛИЧИНА по парче / доза", key: "startingStockPiece" },
            { header: "НАБАВНА ЦЕНА на парче без ДДВ", key: "costPrice" },
            { header: "ПРОДАЖНА ЦЕНА на парче со ДДВ", key: "sellingPrice" },
            { header: "ВРАТЕНА РОБА по пакет", key: "returnedStockPack" },
            { header: "ВРАТЕНИ ПАРЧИЊА", key: "returnedPieces" },
            { header: "ПРОДАДЕНА РОБА по пакет", key: "soldStockPack" },
            { header: "ПРОДАДЕНА РОБА по парче / флаша", key: "soldPieces" },
            { header: "ВКУПНО ПРОМЕТ", key: "totalSales" },
            { header: "ГОЛЕМИНА НА ПАКЕТ", key: "packageSize" },
        ];

        // Map the stock data to include custom headers
        const stockData = rows.map((row) => {
            const mappedRow = {};
            stockHeaders.forEach((header) => {
                mappedRow[header.header] = row[header.key];
            });
            return mappedRow;
        });

        // Define custom column headers for the profit data
        const profitHeaders = [
            { header: "РОБА", key: "item" },
            { header: "ПРОФИТ РАЧУНИЦА", key: "equation" },
            { header: "ПРОФИТ", key: "profit" },
        ];

        // Map the profit data to include custom headers
        const profitData = calculateProfit().map((row) => {
            const mappedRow = {};
            profitHeaders.forEach((header) => {
                mappedRow[header.header] = row[header.key];
            });
            return mappedRow;
        });

        // Create a new workbook
        const wb = XLSX.utils.book_new();

        // Convert the stock data to a sheet with custom headers
        const stockWs = XLSX.utils.json_to_sheet(stockData, { header: stockHeaders.map((h) => h.header) });
        XLSX.utils.book_append_sheet(wb, stockWs, "Stock Data");

        // Convert the profit data to a sheet with custom headers
        const profitWs = XLSX.utils.json_to_sheet(profitData, { header: profitHeaders.map((h) => h.header) });
        XLSX.utils.book_append_sheet(wb, profitWs, "Profit Data");

        // Trigger file download
        XLSX.writeFile(wb, "stock_and_profit_data.xlsx");
    };
    return (
        <div className="container text-center mx-4 mt-4">


            <div className="d-flex justify-content-center gap-5 mb-3 ">
                <img src="./dfest_logo.svg" alt="dfest logo" className="img-fluid" style={{ maxHeight: "130px" }} />
                <img src="./img1.png" alt="img1" className="img-fluid" style={{ maxHeight: "130px" }} />
                <img src="./monkey.png" alt="monkey" className="img-fluid" style={{ maxHeight: "130px" }} />
            </div>


            {/* Existing Stock Table */}
            <div>
                <table className="table  table-striped table-bordered table-hover">
                    <thead>
                        <tr style={{ fontWeight: "bold", fontSize: "1.05em", textAlign: "center", verticalAlign: "top" }}>
                            <th>РОБА </th>
                            <th>ПОЧЕТНА КОЛИЧИНА по пакет</th>
                            <th>ПОЧЕТНА КОЛИЧИНА по парче / доза</th>
                            <th>НАБАВНА ЦЕНА на парче без ДДВ</th>
                            <th>ПРОДАЖНА ЦЕНА на парче со ДДВ</th>
                            <th>ВРАТЕНА РОБА по пакет</th>
                            <th>ВРАТЕНИ ПАРЧИЊА</th>
                            <th>ПРОДАДЕНА РОБА по пакет</th>
                            <th>ПРОДАДЕНА РОБА по парче / флаша</th>
                            <th>ВКУПНО ПРОМЕТ</th>
                            <th>ГОЛЕМИНА НА ПАКЕТ</th>
                            <th>Акции</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row) => (
                            <tr key={row.id}>
                                <td>
                                    <input
                                        type="text"
                                        className="form-control"
                                        style={{ width: "160px" }}
                                        value={row.item}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "item", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.startingStockPack}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "startingStockPack", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.startingStockPiece}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "startingStockPiece", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.costPrice}
                                        step="0.01"
                                        onChange={(e) =>
                                            handleInputChange(row.id, "costPrice", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.sellingPrice}
                                        step="1"
                                        onChange={(e) =>
                                            handleInputChange(row.id, "sellingPrice", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.returnedStockPack}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "returnedStockPack", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.returnedPieces}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "returnedPieces", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">{row.soldStockPack}</td>
                                <td className="text-center">{row.soldPieces}</td>
                                <td className="text-center">{row.totalSales}</td>
                                <td className="text-center">
                                    <input
                                        type="number"
                                        className="form-control text-center"
                                        value={row.packageSize}
                                        onChange={(e) =>
                                            handleInputChange(row.id, "packageSize", e.target.value)
                                        }
                                    />
                                </td>
                                <td className="text-center">
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => deleteRow(row.id)}
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-start">
                <button style={{ width: "180px" }} className="btn btn-primary " onClick={addRow}>
                    Додади Ред
                </button>
            </div>



            {/* Profit Table */}
            <h3 className="mt-5">Профит Табела</h3>
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>РОБА</th>
                        <th className="text-center">ПРОФИТ РАЧУНИЦА</th>
                        <th className="text-center">ПРОФИТ</th>
                    </tr>
                </thead>
                <tbody>
                    {calculateProfit().map((item) => (
                        <tr key={item.id}>
                            <td>{item.item}</td>
                            <td className="text-center">{item.equation}</td>
                            <td className="text-center">{item.profit}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th colSpan="2">Вкупно Профит</th>
                        <th className="text-center">{totalProfit}</th>
                    </tr>
                </tfoot>
            </table>
            <div className="d-flex justify-content-end">
                <button className="btn btn-success mt-3" onClick={exportToExcel}>
                    Извези како Excel
                </button>
            </div>

        </div>
    );
};

export default StockTable;