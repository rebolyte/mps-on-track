import React from 'react';
import { get } from 'lodash-es';
import classNames from 'classnames';

import './DataTable.css';

export interface ColumnMap<T> {
	id: keyof T;
	title: string;
}

export interface HeaderColumn {
	id: string;
	title: string;
	colSpan?: number;
}

export interface HeaderMap {
	id: string;
	columns: HeaderColumn[];
}

export interface SummaryRow {
	id: string;
	value: any;
	rowSpan?: number;
}

export interface SummaryMap {
	id: string;
	values: SummaryRow[];
}

export interface DataTableProps<T, K extends keyof T> {
	cols: ColumnMap<T>[];
	headers?: HeaderMap[];
	summarize?: (data: T[]) => SummaryMap[];
	data: T[];
	idProp: K | ((row: T) => string);
	styleRow?: (row: T) => string | undefined;
	styleCell?: (col: string, val: any) => string | undefined;
	striped?: boolean;
}

function DataTable<T, K extends keyof T>({
	headers,
	cols,
	summarize,
	data,
	idProp,
	styleRow,
	styleCell,
	striped = true
}: DataTableProps<T, K>) {
	const tbodyClasses = classNames({
		striped
	});

	return (
		<table className="data-table m-4 border border-gray-300">
			<thead className="font-semibold bg-gray-300">
				{headers &&
					headers.map(row => (
						<tr key={row.id} className="table-header">
							{row.columns.map(h => (
								<th key={h.id} colSpan={h.colSpan || 1}>
									{h.title}
								</th>
							))}
						</tr>
					))}
				<tr className="column-header">
					{cols.map(col => (
						<th key={col.id as string}>{col.title}</th>
					))}
				</tr>
			</thead>
			<tbody className={tbodyClasses}>
				{data.length > 0 ? (
					data.map(row => {
						let id;
						if (typeof idProp === 'function') {
							id = idProp(row);
						} else {
							id = row[idProp];
						}
						return (
							<tr key={id as string} className={styleRow && styleRow(row)}>
								{cols.map(col => (
									<td
										key={col.id as string}
										className={styleCell && styleCell(col.id as string, get(row, col.id))}
									>
										{get(row, col.id)}
									</td>
								))}
							</tr>
						);
					})
				) : (
					<tr>
						<td colSpan={cols.length}>No records found</td>
					</tr>
				)}
			</tbody>
			{summarize && (
				<tfoot>
					{summarize(data).map(row => (
						<tr key={row.id} className="font-semibold">
							{row.values.map(cell => (
								<td key={cell.id} rowSpan={cell.rowSpan}>
									{cell.value}
								</td>
							))}
						</tr>
					))}
				</tfoot>
			)}
		</table>
	);
}

export default DataTable;
