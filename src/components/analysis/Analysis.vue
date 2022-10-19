<template lang="html">
  <main>
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
      <img v-for="item in celebImgLinkArr" :src="item.link" alt="" :width="item.sizewidth" />
    </div>
    <div class="kakaoBtnWrapper">
      <div class="kakaoBtn">
        <img src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
        alt="카카오톡 공유 보내기 버튼" width="50px"/>
        <span>카카오톡 공유하기</span>
      </div>
    </div>
  </main>
</template>

<script>
import axios from 'axios'
export default {
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
    }
  },
  created(){
    if(this.$store.getters.getCelebName){
      this.onGetAxiosTest();
    }
  },
  methods: {
    onGetAxiosTest(){
      var client_id = 'nNjMkaAeBrwzpZ9QqO35';
      var client_secret = 'jGm8rl5QxU';
      const config = {
        method: 'get',
        url:`/api/v1/search/image?query=${this.$store.getters.getCelebName}&display=10&sort=sim&filter=small`,
        headers:{
          // 'content-type': 'multipart/form-data',
          'X-Naver-Client-Id':client_id,
          'X-Naver-Client-Secret': client_secret,
        }
      }

      axios(config)
        .then(res => {
          if(res.data.items != null && res.data.items.length > 0){
            this.celebImgLinkArr = res.data.items;
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
  }
  .kakaoBtn{
    display:flex;
    border-radius: 10px;
    background-color: #FAE100;
    align-items: center;
    justify-content: center;
    font-size: 1em;
    font-weight: bold;
  }
</style>
