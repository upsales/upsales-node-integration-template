const requiredInput = (name) => {
	throw new Error(`Parameter ${name} is required`);
};

exports.getCfValue = ({upsalesEntity = requiredInput('upsalesEntity'), fieldId = requiredInput('fieldId')}) => {
	if(!upsalesEntity.custom){
		return null;
	}

	const field = upsalesEntity.custom.find((customField) => {
		return customField.fieldId === fieldId;
	});

	return field ? field.value : null;
};

exports.getCfValueByAlias = ({upsalesEntity = requiredInput('upsalesEntity'), alias = requiredInput('alias')}) => {
	if(!upsalesEntity.custom){
		return null;
	}

	const field = upsalesEntity.custom.find((customField) => {
		return customField.alias === alias;
	});

	return field ? field.value : null;
};

exports.setCfValue = ({
	upsalesEntity = requiredInput('upsalesEntity'),
	fieldId = requiredInput('fieldId'),
	value = requiredInput('value')}) => {

	if(!upsalesEntity.custom){
		upsalesEntity.custom = [];
	}

	const field = upsalesEntity.custom.find((customField) => {
		return customField.fieldId === fieldId;
	});

	if(!field){
		upsalesEntity.custom.push({fieldId: fieldId, value: value});
	}else{
		field.value = value;
	}
};

exports.isApiUser = req => req.body && req.body.user && req.body.user.email.includes('@api.upsales.com');
