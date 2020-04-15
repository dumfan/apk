<template>
  <div class="row justify-content-between">
    <div class="col-sm-auto">
      <img class="logo img-responsive mx-auto" src="/apk-logo.png" alt="APK logo" />
    </div>
    <div class="col-sm-7">
      <div class="apk-info">
        <div>
          <p>
            Alkohol per krona (<strong>APK</strong>) är ett studentikost mått som anger mängden alkohol som erhålls per nedlagd krona, vid köp av en alkoholhaltig dryck. APK stiger då dryckens pris sjunker eller alkoholhalten stiger.
          </p>
          </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
	width: 160px;
  display: block;
  margin-bottom: 10px;
}

/* Verticaly center APK info text */
.apk-info {
	display: table;
	height: 90px; /* same height as apk-logo.png */
}
.apk-info div {
	display: table-cell;
	vertical-align: middle;
}
.apk-info p {
	margin: 0;
}
</style>
