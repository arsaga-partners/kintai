function fixFormulaInWorkingHoursCells() {
  initLibraries();

  var global_settings = new GASProperties();
  var spreadsheetId = global_settings.get('spreadsheet');
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  
  var master_folder = DriveApp.getFileById(spreadsheet.getId()).getParents().next();
  var employees_folder = DriveApp.searchFolders('"' + master_folder.getId() + '" in parents and title = "Employees"').next();
  var user_ss = DriveApp.searchFiles('"' + employees_folder.getId() + '" in parents and mimeType = "' + MimeType.GOOGLE_SHEETS + '"');
  var ss, sheet;
  while (user_ss.hasNext()) {
    ss = SpreadsheetApp.openById(user_ss.next().getId());
    Logger.log(ss.getName());
    sheet = ss.getSheetByName('2018年8月');
    if (sheet) {
      sheet.getRange(3, 7, sheet.getLastRow() - 2, 1).setFormulaR1C1('=IF(OR(ISBLANK(RC[-5]),ISBLANK(RC[-4]),ISBLANK(RC[-1])),0,MAX(RC[-2]-RC[-3]-RC[-1],0))');
    }
  }
}
