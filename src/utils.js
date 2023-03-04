export const isLiked = (likes, userId) => likes.some(id => id === userId);

export const tabs = [
	{
	  id: "popular",
	  title: "Популярные",
	},
	{
	  id: "date",
	  title: "По дате",
	},
	{
	  id: "author",
	  title: "По названию",
	},
  ];