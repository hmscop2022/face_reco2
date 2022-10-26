<template lang="html">
  <main >
    <div ref="captureArea">
      <div class="bl_img_profile">
        <div class="bl_img_profile_wrapper">
          <img v-bind:src="storeGetUploadImageData" width="150">
        </div>
        <div>
          <div class="bl_img_profile_section">
            <div class="bl_img_profile_title">얼굴 나이</div>
            <div class="bl_img_profile_value" v-text="storeGetAge">36~38세</div>
          </div>
          <div class="bl_img_profile_section">
            <div class="bl_img_profile_title">성별</div>
            <div class="bl_img_profile_value" v-text="storeGetGender">남자</div>
          </div>
          <div class="bl_img_profile_section">
            <div class="bl_img_profile_title">표정(감정)</div>
            <div class="bl_img_profile_value" v-text="storeGetEmotion">smile</div>
          </div>
        </div>
      </div>
      <div class="hp_seperator">
      </div>
      <div class="subTitle">
        닮은꼴
      </div>
      <div class="celebName">
        <span v-text="storeGetCelebName"></span><span class="celebName_percentage">(<span v-text="storeGetPercentage"></span>)</span>
      </div>
      <div class="img_horizon_container">
        <!-- <img v-for="item in celebImgLinkArr" :src="item.image_url" alt="" :width="item.width" /> -->
        <img v-for="item in celebImgLinkArr" :src="item.link" alt="" :width="item.sizeWidth" />
      </div>
    </div>
    <div class="kakaoBtnWrapper" v-on:click="captureAndShare">
      <div class="kakaoBtn">
        <img src="/kakaoDevelop/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼" width="50px"/>
        <span>카카오톡 공유하기</span>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
import html2canvas from 'html2canvas'
export default {
  mounted(){
    console.log('mounted');
    this.$store.dispatch('callChangeTabname',{tabname: 'analysis'})
  },
  computed: {
    storeGetUploadImageData(){
      return this.$store.getters.getUploadImageData
    },
    storeGetCelebName(){
      return this.$store.getters.getCelebName
    },
    storeGetPercentage(){
      return this.$store.getters.getPercentage
    },
    storeGetAge(){
      return `${this.$store.getters.getAge} 세`
    },
    storeGetEmotion(){
      let emotionKor = '';
      switch (this.$store.getters.getEmotion) {
        case 'angry':
          emotionKor = '화남';
          break;
        case 'disgust':
          emotionKor = '싫음';
          break;
        case 'fear':
          emotionKor = '두려움';
          break;
        case 'laugh':
          emotionKor = '웃음';
          break;
        case 'neutral':
          emotionKor = '자연스러움';
          break;
        case 'sad':
          emotionKor = '슬픔';
          break;
        case 'surprise':
          emotionKor = '놀람';
          break;
        case 'smile':
          emotionKor = '웃음';
          break;
        case 'talking':
          emotionKor = '말하는 중임';
          break;
        default:
      }
      return emotionKor
    },
    storeGetGender(){
      return (this.$store.getters.getGender=='male'?'남자':'여자');
    },
  },
  data () {
    return {
      celebImgLinkArr:[],
      imageLoaded: false,
      captureOutput:null,
    }
  },
  created(){
    if(this.$store.getters.getCelebName){
      this.onGetAxiosTest();
    }
  },
  watch: {
    storeGetCelebName(val, oldVal){
      if(!this.imageLoaded){
        this.onGetAxiosTest();
      }
    }
  },
  methods: {
    captureAndShare(){
      html2canvas(this.$refs.captureArea,{width:600, height:600}).then(canvas => {
        canvas.toBlob(blob => {
          this.shareWeb(blob);
        })
      })
    },
    shareWeb(blob){
      let image_id = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000);
      let name = "image_" + image_id;
      let imageData = null;
      let context = null;
      let maxWidth = 600;
      let maxHeigt = 600;
      let width = maxWidth;
      let height = maxHeigt;
      let vm = this;
      let files = [blob];
      vm.imageIndex = 0;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        let file = files[i];
        if (!file.type.match('image')) continue;
        if (file) {
            var img = document.createElement("img");
            var canvas = document.createElement("canvas");
            reader.onload = function (e) {
                img.src = e.target.result;

            };
            reader.readAsDataURL(file);
            img.onload = function () {
                // Draw
                context = canvas.getContext('2d');
                context.drawImage(img, 0, 0);
                if (img.width > maxWidth || img.height > maxHeigt) {
                    width = maxWidth;
                    height = maxHeigt;

                    if (img.width > maxWidth) {
                        width = maxWidth;
                        var ration = maxWidth / img.width;
                        height = Math.round(img.height * ration);
                    }

                    if (img.height > maxHeigt) {
                        height = maxHeigt;
                        var ration = maxHeigt / img.height;
                        width = Math.round(img.width * ration);
                    }
                } else {
                    width = img.width;
                    height = img.height;
                }
                canvas.width = width;
                canvas.height = height;

                context.drawImage(img, 0, 0, width, height);
                imageData = canvas.toDataURL('image/png');
                imageData.replace('data:image/png;base64,', '');

                let blobToFile = vm.dataURItoBlob(imageData);
                var imageFile = new File([blobToFile], name + ".jpg",{type: "image/png", lastModified: Date.now()});

                navigator.clipboard.write([new ClipboardItem({"image/png": imageFile})]);

                this.$kakao.Share.uploadImage({file:[imageFile]})
                .then(function(response){
                  console.log(response.infos.original.url)
                  this.$kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                      title: `닮은꼴:${this.$store.getters.getCelebName}`,
                      description: `(${this.storeGetPercentage})`,
                      imageUrl:response.infos.original.url,
                      link: {
                        mobileWebUrl: response.infos.original.url,
                        webUrl: response.infos.original.url,
                      },
                    },
                    buttons: [
                    {
                      title: '나도 해보기',
                      link: {
                        mobileWebUrl: response.infos.original.url,
                        webUrl: response.infos.original.url,
                      },
                    },
                  ],
                  });
                }.bind(this))
                .catch(function(error){
                  console.log(error)
                });

            }.bind(this);
          }
      }

    },
    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        var byteString = atob(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to an ArrayBuffer
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var _ia = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            _ia[i] = byteString.charCodeAt(i);
        }
        var dataView = new DataView(arrayBuffer);
        var blob = new Blob([dataView], {type: mimeString});
        return blob;
    },
    onGetAxiosTest(){
        //var kakao_rest_api_key = '9cec24e8875fb096b3b5a6b10e7f1705';
        var client_id = 'nNjMkaAeBrwzpZ9QqO35';
        var client_secret = 'jGm8rl5QxU';
        const config = {
          method: 'get',
          url:`/api/v1/search/image?query=${this.$store.getters.getCelebName}&display=10&sort=sim&filter=small`,
          //url:`/kakaoapi/v2/search/image?query=${this.$store.getters.getCelebName}&size=40&sort=recency&page=1`, //recency, accuracy
          headers:{
             'content-type': 'multipart/form-data',
            'X-Naver-Client-Id':client_id,
            'X-Naver-Client-Secret': client_secret,
            //'Authorization': `KakaoAK ${kakao_rest_api_key}`,
          }
        }

      axios(config)
        .then(res => {
          console.log(res);
          // var items = [];
          // if(res != null && res != undefined && res.data != null && res.data.documents != null && res.data.documents.length >0){
          //   var index = 0;
          //   var count = 0;
          //   for(index = 0; index < res.data.documents.length ;index ++){
          //     if(res.data.documents[index].image_url.startsWith('https')){
          //       count++;
          //       console.log(res.data.documents[index].image_url);
          //
          //       items.push(res.data.documents[index]);
          //       if(count >= 10){
          //         break;
          //       }
          //       this.imageLoaded = true;
          //     }
          //   }
          //   this.celebImgLinkArr = items;
          // }
          if(res.data.items != null && res.data.items.length > 0){
            this.celebImgLinkArr = res.data.items;
          }
          for(var i=0; i<res.data.items.length; i++){
             console.log(res.data.items[i].link);
             //http://imgnews.naver.net
             res.data.items[i].link = res.data.items[i].link.replace('http://imgnews.naver.net','naverImage')
          }
        })
        .catch(res=>{

        })
        .finally(()=>{

        })
    },
  }
}
</script>

<style lang="css" scoped>
  .bl_img_profile{
    display:flex;
    padding: 20px 10px;
  }
  .bl_img_profile_wrapper>img{
    border-radius: 15px;
  }
  .bl_img_profile_wrapper {
    margin-right: 10px;
  }
  .bl_img_profile_title {
    font-size: 0.7em;
    font-weight: bold;
    color: #9d8282;
  }
  .bl_img_profile_value {
    font-size: 0.9em;
    font-weight:bold;
  }
  .bl_img_profile_section {
    margin-top: 8px;
  }
  .hp_seperator{
    width:100%;
    height: 2px;
    background-color: #9d8282;
  }
  .subTitle {
    font-size: 0.7em;
    font-weight: bold;
    padding-top: 16px;
    padding-bottom: 10px;
    padding-left: 10px;
  }
  .celebName {
    font-size: 1.3em;
    font-weight: bold;
    padding-left:10px;
  }
  .celebName_percentage{
    color: #4c4cbd;
  }
  .img_horizon_container{
    display:flex;
    flex-wrap:wrap;
    gap:10px;
    padding: 10px;
  }
  .img_horizon_container > img{
    border-radius: 10px;
    margin-right:10px;
  }
  .kakaoBtnWrapper{
    padding: 15px 10px;
    cursor:pointer;
  }
  .kakaoBtn{
    display:flex;
    min-height:50px;
    border-radius: 10px;
    background-color: #FAE100;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
  }
</style>
