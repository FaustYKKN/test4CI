import page from 'epm-ui-boot/page';

// 公用资源（ 调用 gitlab 的 npm 包 ）
export function gitLabApi( GitLab ) {
  let api = new GitLab( {
    jobToken: `${ page.context.private_token }`,
    host: `${ page.context.codeSecretHost }`,
  } );
  return api;
}

// 通过 script 标签加载 @gitbeaker 资源包
export function importSource ( ) {
  const script = document.createElement("script");
  script.src = `${ page.basename }/js/@gitbeaker/dist/index.js`;
  script.type = "text/javascript";
  document.head.appendChild(script);
}