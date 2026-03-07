// ---------- Logging helper ----------
const logger = {
  log: function(level, message, data) {
    try {
      let logEntry = `[CanvasFun] [${level}] ${message}`;
      if (data !== undefined) {
        // In Google Apps Script, console.log can handle objects, but let's be explicit for clarity
        // and robustness, especially if logs were ever redirected to a text-based system.
        if (typeof data === 'object' && data !== null) {
          // Using JSON.stringify for a consistent, readable format in the logs.
          // The null, 2 arguments pretty-print the JSON.
          logEntry += `\n${JSON.stringify(data, null, 2)}`;
        } else {
          logEntry += ` | ${data}`;
        }
      }
      console.log(logEntry);
    } catch (e) {
      // Fallback for any logging errors
      console.log('[CanvasFun] [FATAL] Logging system failed.', e.toString());
    }
  },
  info: function(message, data) { this.log('INFO', message, data); },
  warn: function(message, data) { this.log('WARN', message, data); },
  error: function(message, error) {
    // Specifically for errors, we want to capture the message, stack trace, and any additional data.
    let errorData = {};
    if (error instanceof Error) {
      errorData.name = error.name;
      errorData.message = error.message;
      errorData.stack = error.stack;
    } else if (typeof error === 'object' && error !== null) {
      // If it's an object but not an Error instance, merge it.
      errorData = { ...errorData, ...error };
    } else if (error !== undefined) {
      errorData.details = error;
    }
    this.log('ERROR', message, errorData);
  }
};

  function doGet() {
    return HtmlService.createHtmlOutputFromFile('Canvas Fun');
  }
