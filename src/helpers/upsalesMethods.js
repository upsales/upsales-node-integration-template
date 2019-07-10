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
