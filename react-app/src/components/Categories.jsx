import { useNavigate } from 'react-router-dom';
import './Categories.css'; // Updated CSS file
import categories from './CategoriesList';

function Categories() {
    const navigate = useNavigate();

    return (
        <div className='categories-container'>
            <h2 className='categories-title'>Categories</h2>
            <div className='categories-list'>
                {categories && categories.length > 0 &&
                    categories.map((item, index) => (
                        <span 
                            key={index} 
                            className='category-item' 
                            onClick={() => navigate('/category/' + item)}
                        >
                            {item}
                        </span>
                    ))}
            </div>
        </div>
    );
}

export default Categories;
