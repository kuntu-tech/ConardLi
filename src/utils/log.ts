import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const logsDir = path.join(__dirname, "../../logs");
let index = 0;

/**
 * 清空日志目录
 */
export function clearLogs(): void {
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
export function addLogs(logData: any) {
  index++;

  if (logData) {
    fs.writeFileSync(
      path.join(__dirname, `../../logs/Step${index}.json`),
      JSON.stringify(logData, null, 2)
    );
  }
}
