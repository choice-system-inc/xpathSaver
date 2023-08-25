// content.js

// マウスオーバーされた要素のXPathを取得する関数
function getXPath(element) {
  if (!element) {
    return 'Element not found'; // エラー処理またはメッセージを返す
  }

  if (element === document.body) {
    return 'body';
  }

  const parentElement = element.parentNode;

  if (!parentElement) {
    return 'Parent element not found'; // エラー処理またはメッセージを返す
  }

  const siblingElements = Array.from(parentElement.children);
  const elementIndex = siblingElements.indexOf(element) + 1;

  return `${getXPath(parentElement)}/${element.tagName.toLowerCase()}[${elementIndex}]`;
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
