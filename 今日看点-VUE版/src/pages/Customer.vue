<template>
    <div class="customer">
        顾客{{id}}
    </div>
</template>
<script>
export default {
    watch:{
        '$route':function(to,from){
            this.id = to.params.id;
        }
    },
    data(){
        return {
            id:0
        }
    },
    mounted(){
        this.id = this.$route.params.id;
        //alert(JSON.stringify(this.$route.params))
       // console.log(this.$route)
    }
}
</script>
