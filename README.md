# Subscription Manager | 订阅管理器

A modern, self-hosted subscription management application built with Next.js. Track all your subscriptions, manage renewal cycles, and monitor costs in multiple currencies with automatic conversion to CNY.

一个现代化的自托管订阅管理应用，使用 Next.js 构建。追踪您的所有订阅，管理续费周期，并监控多种货币的成本，自动转换为人民币。

## ✨ Features | 功能特性

- 📊 **Subscription Management** | 订阅管理 - Add, edit, delete, and search your subscriptions
- 💱 **Multi-Currency Support** | 多货币支持 - Support for USD, CNY, EUR, GBP, and RUB
- 🔄 **Automatic Currency Conversion** | 自动货币转换 - Real-time exchange rates with monthly CNY cost display
- 💰 **Cost Overview** | 成本总览 - Summary dashboard showing total annual and average monthly costs
- 🎨 **Modern UI** | 现代化界面 - Clean, responsive interface with dark mode support
- 🔒 **Secure Authentication** | 安全认证 - Simple key-based access control
- 🗄️ **Self-Hosted** | 自托管 - Full control of your data with MongoDB storage

## 📸 Screenshot | 截图

![Subscription Manager Screenshot](screenshot/screenshot.png)

## 🛠️ Tech Stack | 技术栈

- **Framework | 框架**: Next.js 15.5.6 (App Router)
- **Language | 语言**: TypeScript 5 (strict mode)
- **Database | 数据库**: MongoDB Atlas / Self-hosted MongoDB
- **Styling | 样式**: TailwindCSS 4
- **Icons | 图标**: Lucide React
- **Currency Data | 汇率数据**: ExchangeRate-API
- **Runtime | 运行时**: Node.js

## 🚀 Deploy | 部署

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fglenhoooo%2Fsubscription&env=NEXT_PUBLIC_AUTH_KEY,MONGODB_URI,EXCHANGERATE_API_KEY&envDescription=Required%20environment%20variables%20for%20Subscription%20Manager&envLink=https%3A%2F%2Fgithub.com%2Fglenhoooo%2Fsubscription%23environment-variables)

点击按钮一键部署到 Vercel。

### Environment Variables | 环境变量

After clicking the deploy button, you'll need to configure these environment variables:

点击部署按钮后，需要配置以下环境变量：

| Variable               | Description                                                                                       | 说明                                   | Required | 必需 |
| ---------------------- | ------------------------------------------------------------------------------------------------- | -------------------------------------- | -------- | ---- |
| `NEXT_PUBLIC_AUTH_KEY` | Authentication key for app access                                                                 | 应用访问认证密钥                       | Yes      | 是   |
| `MONGODB_URI`          | MongoDB connection string ([Get from MongoDB Atlas](https://cloud.mongodb.com))                   | MongoDB 连接字符串                     | Yes      | 是   |
| `EXCHANGERATE_API_KEY` | API key from [exchangerate-api.com](https://www.exchangerate-api.com) (1,500 free requests/month) | 汇率 API 密钥（每月 1,500 次免费请求） | Yes      | 是   |

## 🎯 Usage | 使用方法

1. **First Login | 首次登录**: Enter your authentication key (set in `NEXT_PUBLIC_AUTH_KEY`)
2. **Add Subscription | 添加订阅**: Click "添加订阅" button
3. **Fill Details | 填写信息**:
   - Choose an icon | 选择图标
   - Enter subscription name | 输入订阅名称
   - Select renewal cycle (monthly/quarterly/yearly) | 选择续费周期（按月/按季度/按年）
   - Enter price and currency | 输入价格和货币
   - Set next renewal date | 设置下次续费日期
4. **View Overview | 查看总览**: Check the summary section for total costs
5. **Manage | 管理**: Edit or delete subscriptions as needed

## 📦 Alternative Deployment | 其他部署方式

This application can also be deployed to:

此应用也可以部署到：

- **Netlify**
- **Railway**
- **Self-hosted** | 自托管 (Docker, VPS, etc.)

Remember to configure environment variables in your deployment platform.

记得在部署平台上配置环境变量。

## 🔧 Local Development | 本地开发

```bash
# Clone the repository | 克隆仓库
git clone <your-repo-url>
cd subscription

# Install dependencies | 安装依赖
npm install
# or | 或者
pnpm install

# Configure environment variables | 配置环境变量
cp .env.example .env.local
# Edit .env.local with your values | 编辑 .env.local 填入您的配置

# Run development server | 运行开发服务器
npm run dev

# Build for production | 生产环境构建
npm run build
npm start
```

## 📝 License | 开源协议

This project is open source and available under the MIT License.

本项目基于 MIT 协议开源。

## 🤝 Contributing | 贡献

Contributions are welcome! Feel free to submit issues and pull requests.

欢迎贡献！随时提交问题和拉取请求。

## 📧 Contact | 联系方式

For questions and support, please open an issue.

如有问题和需要支持，请提交 Issue。
