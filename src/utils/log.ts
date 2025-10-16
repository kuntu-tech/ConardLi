import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDir = path.join(__dirname, "../../logs");
let index = 0;

export enum logType {
  GetTools = "[GET Tools]",
  GetToolsError = "[GET Tools Error]",
  ConnectToServer = "[Connect To Server]",
  LLMRequest = "[LLM Request]",
  LLMResponse = "[LLM Response]",
  LLMError = "[LLM Error]",
  LLMStream = "[LLM Stream]",
  ToolCall = "[Tool Call]",
  ToolCallResponse = "[Tool Call Response]",
  ToolCallError = "[Tool Call Error]",
}

/**
 * 清空日志目录
 */
export function clearLogs(): void {
  if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir);
  }
  fs.readdir(logsDir, (err, files) => {
    if (err) {
      console.error("清空日志目录失败:", err);
      return;
    }
    files.forEach((file) => {
      const filePath = path.join(logsDir, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`删除文件 ${filePath} 失败:`, err);
        } else {
          console.log(`已删除历史日志文件 ${filePath}`);
        }
      });
    });
  });
}

/**
 * 添加日志
 * @param logData
 */
export function addLogs(logData: any, logType: logType) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const logFileName = `[${index++}] ${logType} ${year}-${month}-${day} ${hours}-${minutes}-${seconds}`;

  // console.log(logFileName, JSON.stringify(logData, null, 2));

  console.log(logFileName);

  if (logData) {
    fs.writeFileSync(
      path.join(__dirname, `../../logs/${logFileName}.json`),
      JSON.stringify(logData, null, 2)
    );
  }
}
