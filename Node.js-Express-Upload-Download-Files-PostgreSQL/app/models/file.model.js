module.exports = (sequelize, Sequelize) => {
	const File = sequelize.define('file', {
	  type: {
			type: Sequelize.STRING
	  },
	  image_name: {
			type: Sequelize.STRING
	  },
	  data: {
			type: Sequelize.BLOB('long')
	  },
	  Name: {
		type: Sequelize.STRING
	  },
	  Roll_No: {
		type: Sequelize.STRING
      }
	});
	
	return File;
}