const entityHasChanged = ({oldEntity, newEntity}) => {
	if(newEntity == null){
		return false;
	}

	if(oldEntity == null){
		return true;
	}

	const diffKey = Object.keys(newEntity).find((key) => {
		if(Array.isArray(newEntity[key])){
			return newEntity[key].some((row, index) => {
				if(!oldEntity[key] || !oldEntity[key][index]){
					return true;
				}

				return entityHasChanged({oldEntity: oldEntity[key][index], newEntity: row});
			});
		}

		if(newEntity !== null && typeof newEntity[key] === 'object' && oldEntity !== null && typeof oldEntity[key] === 'object'){
			return entityHasChanged({oldEntity: oldEntity[key], newEntity: newEntity[key]});
		}
		let oldValue;
		if(oldEntity[key] === undefined){
			oldValue = undefined;
		}else{
			oldValue = JSON.parse(JSON.stringify(oldEntity[key]));
		}

		if(oldValue != null && typeof oldValue === 'object' && oldValue.id){
			oldValue = oldValue.id;
		}


		let newValue;
		if(newEntity[key] === undefined){
			newValue = undefined;
		}else{
			newValue = JSON.parse(JSON.stringify(newEntity[key]));
		}

		if(newValue != null && typeof newValue === 'object' && newValue.id){
			newValue = newValue.id;
		}

		if(newValue === null || newValue === undefined || newValue === '' || newValue === 'API_BLANK'){
			newValue = '';
		}

		if(oldValue === null || oldValue === undefined || oldValue === ''){
			oldValue = '';
		}

		let hasChanged = newValue !== oldValue;

		if(oldValue === true && newValue === 1 || newValue === true && oldValue === 1){
			hasChanged = false;
		}

		if(oldValue === false && newValue === 0 || newValue === false && oldValue === 0){
			hasChanged = false;
		}

		return hasChanged;
	});


	return !!diffKey;
};

module.exports = entityHasChanged;