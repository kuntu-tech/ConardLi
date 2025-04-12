/**
 * MCP 服务器配置类型定义
 */

/**
 * 单个 MCP 服务器配置
 */
export interface MCPServerConfig {
  command: string;       // 启动命令
  args?: string[];       // 命令参数
  env?: Record<string, string>; // 环境变量
  description?: string;  // 服务描述
}

/**
 * MCP 服务器配置映射
 */
export interface MCPServersConfig {
  mcpServers: {
    [key: string]: MCPServerConfig;
  };
  defaultServer?: string; // 默认服务器名称
}
