<template>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="desserts"
    :single-select="singleSelect"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template v-slot:top>
      <v-col>
        <v-select v-model="list" :items="lists" label="선택" max-width="150"></v-select>
      </v-col>
      <v-switch v-model="singleSelect" label="단일 선택" class="pa-3"></v-switch>
      <v-btn class="elevation-0" color="green">삭제</v-btn>
    </template>
  </v-data-table>
</template>

<script>
export default {
  data () {
    return {
      singleSelect: false,
      selected: [],
      list: '게시물',
      lists: ['게시물','댓글'],
      headers: [
        {
          text: '제목',
          align: 'left',
          sortable: false,
          value: 'name',
        },
        { text: '내용', value: 'calories' },
        { text: '별점', value: 'fat' },
      ],
      desserts: [
        {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4 
        }, {
          name: '디저트 맛집',
          calories: '일가 친척들이 모여 아침먹고 디저트가 ',
          fat: 4.7,
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4 
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4
        }, {
          name: '수원 여행기',
          calories: '수원 북문 여행기',
          fat: 3.4 
        },
      ],
    }
  },
}
</script>