# 发布新 Package 版本

## 发布到 GitHub Package Registry

#### 通过本地发布（临时方案-正在使用）
1. 联系管理员，获取发布权限（获得发布权限的同时还将获取到 Github Token）
2. 在根目录下创建 `.env.local` 文件，内容如下：
    ```
    GITHUB_TOKEN=$GITHUB_TOKEN
    ```
    $GITHUB_TOKEN 为管理员提供的 Github Token
3. 更改 `package.json` 中的 `version` 字段
4. 运行 `pnpm run publish:pkg`，根据提示即可完成新版本的发布

### 使用 Github Action 发布 (新方案-暂不可用)
1. 更改 `package.json` 中的 `version` 字段
2. 提交一个Commit，Commit Message 为 `release(@{version}): your commit message...`

## 发布到 NPM
1. 将本地代码中的`.npmrc`文件中的`stevenleep:registry`注释掉
2. 运行 `npm run publish`，根据提示即可完成新版本的发布