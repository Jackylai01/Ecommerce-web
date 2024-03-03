import * as XLSX from 'xlsx';

export const generateExcelDocument = (data: any) => {
  const excelData = data.map(
    (response: any) => response.responseData.formData || {},
  );

  if (excelData.length === 0) {
    console.error('No data available for Excel export.');
    return;
  }

  const worksheet = XLSX.utils.json_to_sheet(excelData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Responses');

  XLSX.writeFile(workbook, 'form-responses.xlsx');
};
