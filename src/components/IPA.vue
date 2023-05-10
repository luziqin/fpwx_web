<script setup lang="ts">
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useIPAStore } from '~/stores/ipa_store';

onMounted(() => {
   axios({
        method: 'get',
        url: 'https://69.176.94.109:8000/',
    }).then(res => {
        console.log(res.data);
    });
});

const ipaStrore = useIPAStore()

const _error = ref<Error>();

function downloadIPA(index: number) {
    ipaStrore.downloadIPA(index).then(res => {
        const { url, requestState } = res;
        const { loading, error } = requestState;
        if (loading) {
            return;
        }
        if (error != null) {
            _error.value = error;
            dialogVisible.value = true;
        }
    });
}

const dialogVisible = ref(false)

const handleClose = (done: () => void) => {
    done()
}
</script>

<template>
    <el-text type="primary" class="title">翻盘微信下载</el-text>
    <el-row :gutter="20" style="margin-top: 20px">
        <el-col v-for="(item, index) in ipaStrore.ipaList" :key="item" :span="10" :offset="index % 2 == 0 ? 2 : 0">
            <el-card :body-style="{ padding: '14px' }">
                <img src="../assets/wechat3rd.png" class="image" />
                <div style="padding: 14px">
                    <span></span>
                    <div class="bottom">
                        <el-text type="primary" class="name">{{ item }}</el-text>
                        <el-button text class="button" @click="downloadIPA(index)">点击下载</el-button>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="错误" width="30%" :before-close="handleClose">
        <span>{{ _error?.message }}</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" @click="dialogVisible = false">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<style>
.title {
    font-size: large;
    color: rgb(19, 55, 117);
}

.name {
    font-size: 14px;
    color: rgb(19, 55, 117);
}

.bottom {
    margin-top: 13px;
    line-height: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    padding: 0;
    min-height: auto;
}

.image {
    width: 30%;
    display: block;
}

.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>