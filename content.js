// content.js

// マウスオーバーされた要素のXPathを取得する関数
function getXPath(element) {
  if (element === document.body) {
    return 'body';
  }

  const siblingElements = Array.from(element.parentNode.children);
  const elementIndex = siblingElements.indexOf(element) + 1;

  return `${getXPath(element.parentNode)}/${element.tagName.toLowerCase()}[${elementIndex}]`;
}

// メッセージを受け取り、XPathを送信
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.action === "getXPath") {
    const target = document.querySelector(':hover');
    const xpath = getXPath(target);

    // XPathをバックグラウンドスクリプトに送信
    chrome.runtime.sendMessage({ action: "downloadXPath", xpath: xpath });
  }
});
