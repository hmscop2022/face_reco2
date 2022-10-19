<template lang="html">
  <div class="bl_upload">
    <h3 class="bl_upload_title">얼굴 사진과 닮은 꼴 유명인을 찾아드립니다</h3>
    <h4 class="bl_upload_subTitle">용량 2MB 미만의 이미지를 업로드 하세요!</h4>
    <div class="bl_upload_imgBtn">
      <img class="bl_upload_img" v-bind:src="storeGetUploadImageData" width="250" height="250" alt="">
      <div class="ly_btnTwoColumn">
        <a class="el_btn ic_image" href="#" v-on:click="imageSelect">업로드</a>
        <a class="el_btn ic_search" href="#" v-on:click="onGetAxiosTest">찾기</a>.
      </div>
    </div>
    <input type="file" name="" value="" id="customFile" @change="handleFileChange" class="blind" ref="fileInput">
  </div>
</template>

<script>
import axios from 'axios'
export default {
  computed: {
    storeGetUploadImageData(){
      return this.$store.getters.getUploadImageData
    },
  },
  data () {
    return {
      image:'',
    }
  },
  methods: {
    imageSelect(){
      this.$refs.fileInput.click();
    },
    handleFileChange(event){
      // console.log(event.target.files[0]);
      let image_id = Math.floor(Math.random() * (1000000 - 1000 + 1) + 1000);
      let name = "image_" + image_id;
      let imageData = null;
      let context = null;
      let maxWidth = 500;
      let maxHeigt = 500;
      let width = maxWidth;
      let height = maxHeigt;
      let vm = this;
      let files = event.target.files;
      vm.imageIndex = 0;
      let formData = new FormData();
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
                imageData = canvas.toDataURL('image/jpeg');
                this.$store.dispatch('callChangeValue',{uploadImageData: imageData, celebName:'',percentage:0,age:0,emotion:'',gender:''});
                imageData.replace('data:image/jpeg;base64,', '');

                let blobToFile = vm.dataURItoBlob(imageData);
                this.image = new File([blobToFile], name + ".jpg",
                    {type: "image/jpeg", lastModified: Date.now()});
            }.bind(this);
          }
      }
    },
    onGetAxiosTest(){
      var client_id = 'nNjMkaAeBrwzpZ9QqO35';
      var client_secret = 'jGm8rl5QxU';
      const formData = new FormData();
      formData.append('image', this.image)
      const config = {
        headers:{
          // 'content-type': 'multipart/form-data',
          'X-Naver-Client-Id':client_id,
          'X-Naver-Client-Secret': client_secret,
        }
      }
      axios.post('/api/v1/vision/celebrity',formData, config)
        .then(res => {
          var celeb = res.data.faces[0].celebrity.value
          var percentage = Math.round(res.data.faces[0].celebrity.confidence*100)+'%';
          this.$store.dispatch('callChangeValue',{celebName: celeb, percentage});
        })
        .catch(res=>{

        })
        .finally(()=>{

        })
      axios.post('/api/v1/vision/face',formData, config)
        .then(res => {
          const {age, emotion, gender} = res.data.faces[0];
          this.$store.dispatch('callChangeValue',{age:age.value, emotion:emotion.value, gender:gender.value});
        })
        .catch(res=>{

        })
        .finally(()=>{

        })
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
  }
}
</script>

<style lang="css" scoped>
.bl_upload {
  width: 90%;
  margin: 0 auto;
  border: 2px solid #ddd;
  margin-top: 20px;
  padding: 20px 10px;
  text-align: center;
  border-radius: 8px;
}
.bl_upload_title {
  font-size: .9rem;
  font-weight: bold;
  margin-bottom: 5px;
}
.bl_upload_subTitle {
  font-size: .8rem;
  color: #5d5d5d;
  margin-bottom: 10px;
}
.bl_upload_imgBtn{
  display:inline-block;
  width: 250px;
}
.bl_upload_img{
  display:inline-block;
}
.ly_btnTwoColumn{
  display: inline-block;
  box-sizing: border-box;
  margin-top: 5px;
  width: 250px;
  height: 3em;
  text-align: center;
}
.ly_btnTwoColumn .el_btn{
  box-sizing: border-box;
  display: inline-block;
  width: 49%;
  padding: 1em 0.3em;
  font-size: .8rem;
  font-weight: bold;
}
.blind {
  display:none;
}
</style>
