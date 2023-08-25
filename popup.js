// ポップアップウィンドウが開かれたときに実行されるコード
document.addEventListener('DOMContentLoaded', function () {
    // "Save XPath to File" ボタンをクリックしたときの処理を登録
    document.getElementById('saveButton').addEventListener('click', function () {
      // バックグラウンドスクリプトにメッセージを送信してXPathの保存をトリガー
      chrome.runtime.sendMessage({ action: "saveXPathToFile" });
    });
  });
  