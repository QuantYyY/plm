import axios from "axios";

export default {
    actions: {
        async getTypeObject({ commit }, change = false) {
            await axios.get('/dataset').then((response) => {
                if (!change) {
                    commit('updateListType', response.data);
                }
                else {
                    commit('updateListItem', { items: response.data });
                }
            });
        },
        async getAllType({commit}){
            await axios.get('/dataset').then((response) => {
                commit('updateAllTypeForMap', response.data);
            })
        },
        async getOneTypeObject({ commit }, id) {
            switch (typeof id) {
                case 'number': {
                    await axios.get(`/dataset/admin/${id}`).then((response) => {
                        let result = { ...response.data };
                        result.properties = { ...result };

                        delete result.properties.id;
                        delete result.properties.image;

                        for (let i in result) {
                            if (i != 'properties' && i != 'id' && i != 'image') {
                                delete result[i];
                            }
                        }
                        commit('updateObjectForCard', result);
                    })
                    break;
                }
                case 'object': {
                    await axios.get(`/dataset/admin/${id.id}`).then((response) => {
                        commit('updateTypeForLayer', response.data);
                    })
                    break;
                }
            }
        },
        async getOneTypeObjectForFeature({ commit }, { id, forFeature = false }) {
            await axios.get(`/dataset/${id}`).then((response) => {
                commit('updateOneType', { type: response.data, forFeature });
            });
        },
        async postTypeObject({ dispatch }, newType) {
            console.log(newType);
            await axios.post('/dataset/admin', newType).then((response) => {
                console.log(response.data);
                dispatch('getTypeObject', true);
            })
        },
        async putTypeObject({ dispatch, state }, type) {
            let putType = { ...type.properties };
            for(let key in type){
                if(key != 'properties'){
                    putType[key] = type[key]
                }
            }
            await axios.put('/dataset/admin', putType).then((response) => {
                console.log(response.data);
                if(state.pastGroup != null){
                    dispatch('getAllTypeInGroup', state.pastGroup);
                }
                else{
                    dispatch('getAllTypeForTable');
                }
            });
        },
        async deleteTypeObject({ dispatch }, id) {
            await axios.delete(`/dataset/admin?id=${id}`).then((response) => {
                console.log(response.data);
                dispatch('getTypeObject', true);
            })
        }, 
        async getSortType({ commit }, drawType){
            await axios.get(`/dataset?type=${drawType}`).then((response) => {
                commit('updateSelectedDrawType', response.data);
            })
        },
        async getAllTypeForTable({ commit }){
            await axios.get('/dataset').then((response) => {
                commit('updateAllTypeForTable', response.data)
            })
        },
        async getAllTypeInGroup({ commit, state }, group){
            state.pastGroup = group;
            await axios.get(`/dataset?group=${group}`).then((response) => {
                commit('updateAllTypeForTable', response.data);
            })
        }
    },
    mutations: {
        updateListType(state, list) {
            state.listType = list;
        },
        updateOneType(state, { type, forFeature }) {
            if (forFeature) {
                state.typeForFeature = type;
            }
            else {
                state.type = type;
            }
        },
        updateTypeForLayer(state, type){
            state.typeForLayer = type;
        },
        updateSelectedDrawType(state, type){
            state.selectedDrawType = type;
        },
        updateAllTypeForMap(state, types){
            state.allTypeForMap = types;
        },
        updateAllTypeForTable(state, types){
            state.allTypeForTable = types;
            this.commit('updateListItem', {items: types});
        }
        
    },
    getters: {
        allType(state) {
            return state.listType;
        },
        oneType(state) {
            return state.type
        },
        typeForFeature(state) {
            return state.typeForFeature;
        },
        typeForLayer(state){
            return state.typeForLayer;
        },
        selectedDrawType(state){
            return state.selectedDrawType;
        },
        allTypeForMap(state){
            return state.allTypeForMap;
        },
        allTypeForTable(state){
            return state.allTypeForTable
        }
    },
    state: {
        listType: [],
        allTypeForMap: [],
        type: null,
        typeForFeature: {
            id: 0,
            headers: [],
            properties: [],
        },
        typeForLayer: {},
        selectedDrawType: [],
        allTypeForTable: [],
        pastGroup: null,
    },
}