function addViaColumn() {
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
    ss.getSheets().forEach(function (sheet) {
      if (sheet.getName().match(/^\d{4}年\d{1,2}月$/) === null) {
        return;
      }
      sheet.getRange('J2').setValue('経由');
      sheet.setColumnWidth(10, 50);
    });
  }
}
