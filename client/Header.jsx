Header = React.createClass({
  render: function() {
    return (
      <div className="row">
        <div className="col-sm-2">
          <img className="logo img-responsive center-block" src="/apk-logo.png" alt="APK logo" />
        </div>
        <div className="col-sm-5">
          <div className="apk-info">
            <div>
              <p>
                Alkohol per krona (<strong>APK</strong>) är ett studentikost mått som anger mängden alkohol som erhålls per nedlagd krona, vid köp av en alkoholhaltig dryck. APK stiger då dryckens pris sjunker eller alkoholhalten stiger.
              </p>
              </div>
          </div>
        </div>
        <div className="col-sm-2 hidden-xs">
        </div>
        <div className="col-sm-3 hidden-xs chrome-extension">
          <div className="row">
            <div className="col-md-2">
              <img src="/chrome-logo.png" alt="Chrome logo" />
            </div>
            <div className="col-md-10">
              <p>
                Testa även <a href="https://chrome.google.com/webstore/detail/systembolaget-apk/njcbniedjlbhdnolbchleaocgkhojofl?hl=sv&gl=SE">APK Chrome plugin</a> för att se APK direkt på systembolaget.se.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
