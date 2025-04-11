#!/usr/bin/env node

/**
 * MCP Client 主入口文件
 * 
 * 这是一个基于Model Context Protocol的客户端实现，使用OpenAI API
 * 用于连接MCP服务器并提供LLM对话能力
 */

// 显式引用Node.js类型以解决process相关问题
/// <reference types="node" />

import { MCPClient } from "./mcpClient.js";
import { validateEnv } from "./utils/config.js";

/**
 * 显示使用说明
 */
function showUsage(): void {
  console.log("=====================================================");
  console.log("MCP Client - 模型上下文协议客户端");
  console.log("=====================================================");
  console.log("用法: node build/index.js <服务器脚本路径>");
  console.log("示例: node build/index.js ../mcp-server/build/index.js");
  console.log("=====================================================");
}

/**
 * 主函数
 * 处理命令行参数并启动MCP客户端
 */
async function main() {
  try {
    // 验证环境变量
    validateEnv();
    
    // 检查命令行参数
    if (process.argv.length < 3) {
      showUsage();
      return;
    }

    const serverPath = process.argv[2];
    
    // 创建MCP客户端实例
    const mcpClient = new MCPClient();
    
    try {
      // 连接到MCP服务器
      console.log(`正在连接到服务器: ${serverPath}`);
      await mcpClient.connectToServer(serverPath);
      
      // 启动交互式聊天循环
      await mcpClient.chatLoop();
    } catch (error) {
      console.error("\n运行MCP客户端时出错:", error);
    } finally {
      // 确保资源被清理
      await mcpClient.cleanup();
    }
  } catch (error) {
    console.error("初始化MCP客户端失败:", error);
  } finally {
    process.exit(0);
  }
}

// 执行主函数
main();
