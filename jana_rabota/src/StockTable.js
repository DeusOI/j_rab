import React, { useState } from "react";
import "./index.css"; // Assuming your CSS file is called 'index.css'
import "bootstrap/dist/css/bootstrap.min.css";
import * as XLSX from "xlsx";


const StockTable = () => {
    const [rows, setRows] = useState([
        { id: 1, item: "Rosa", startingStockPack: 0, startingStockPiece: 0, costPrice: 18.64, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 2, item: "Coca Cola", startingStockPack: 0, startingStockPiece: 0, costPrice: 24.92, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 3, item: "Coca Cola Zero", startingStockPack: 0, startingStockPiece: 0, costPrice: 24.92, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 4, item: "Skopsko", startingStockPack: 0, startingStockPiece: 0, costPrice: 33.41, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 5, item: "Skopsko Smooth", startingStockPack: 0, startingStockPiece: 0, costPrice: 33.41, sellingPrice: 100, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 6, item: "Johnny", startingStockPack: 0, startingStockPiece: 0, costPrice: 150, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 12 },
        { id: 7, item: "Smirnoff", startingStockPack: 0, startingStockPiece: 0, costPrice: 150, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 12 },
        { id: 8, item: "Gordons", startingStockPack: 0, startingStockPiece: 0, costPrice: 150, sellingPrice: 150, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 12 },
        { id: 9, item: "Gordons+tonic", startingStockPack: 0, startingStockPiece: 0, costPrice: 200, sellingPrice: 200, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
        { id: 10, item: "Tonic", startingStockPack: 0, startingStockPiece: 0, costPrice: 48.96, sellingPrice: 200, returnedStockPack: 0, returnedPieces: 0, soldStockPack: 0, soldPieces: 0, totalSales: 0, packageSize: 24 },
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
                const updatedRow = { ...row, [field]: value };

                // Update startingStockPack and startingStockPiece logic
                if (field === "startingStockPack") {
                    updatedRow.startingStockPack = Number(value);
                    updatedRow.startingStockPiece = updatedRow.startingStockPack * updatedRow.packageSize;
                }

                if (field === "startingStockPiece") {
                    updatedRow.startingStockPiece = Number(value);
                    updatedRow.startingStockPack = Math.floor(updatedRow.startingStockPiece / updatedRow.packageSize);
                }

                // Update returnedStockPack and returnedPieces logic
                if (field === "returnedStockPack") {
                    updatedRow.returnedStockPack = Number(value);
                    updatedRow.returnedPieces = updatedRow.returnedStockPack * updatedRow.packageSize;
                }

                if (field === "returnedPieces") {
                    updatedRow.returnedPieces = Number(value);
                    updatedRow.returnedStockPack = Math.floor(updatedRow.returnedPieces / updatedRow.packageSize);
                }

                // Calculate total starting stock in pieces
                const totalStartingPieces = updatedRow.startingStockPiece || 0;

                // Calculate total returned stock in pieces
                const totalReturnedPieces = updatedRow.returnedPieces || 0;

                // Calculate sold stock in pieces
                const soldPieces = totalStartingPieces - totalReturnedPieces;
                updatedRow.soldPieces = soldPieces > 0 ? soldPieces : 0;

                // Calculate sold stock in packs
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
        <div className="container mt-4">
            {/* Existing Stock Table */}
            <table className="table table-striped table-bordered table-hover">
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
                                    step="0.01"
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
                                    Избриши
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button className="btn btn-primary" onClick={addRow}>
                Додади Ред
            </button>



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
            <button className="btn btn-success mt-3" onClick={exportToExcel}>
                Извези како Excel
            </button>

        </div>
    );
};

export default StockTable;