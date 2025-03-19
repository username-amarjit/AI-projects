Here are the **SQL database schemas** for the SmartContentAI platform. These schemas reflect the entities described earlier, including **Users**, **Content**, **Feedback**, **Preferences**, **Subscription Plans**, and **Analytics**. These will be written using **PostgreSQL** syntax.

---

### **1. Users Table**

```sql
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);
```

---

### **2. Subscription Plans Table**

```sql
CREATE TABLE Subscription_Plans (
    plan_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    max_content INT NOT NULL,
    features TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **3. User_Subscriptions Table**

```sql
CREATE TABLE User_Subscriptions (
    user_subscription_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    plan_id INT NOT NULL,
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    status VARCHAR(20) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES Subscription_Plans(plan_id) ON DELETE CASCADE
);
```

---

### **4. Content Table**

```sql
CREATE TABLE Content (
    content_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    content_type VARCHAR(50) NOT NULL,
    title VARCHAR(255),
    body TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
```

---

### **5. Content_Feedback Table**

```sql
CREATE TABLE Content_Feedback (
    feedback_id SERIAL PRIMARY KEY,
    content_id INT NOT NULL,
    user_id INT NOT NULL,
    rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_id) REFERENCES Content(content_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
```

---

### **6. User_Preferences Table**

```sql
CREATE TABLE User_Preferences (
    preference_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    tone VARCHAR(50),
    writing_style VARCHAR(50),
    content_length VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
```

---

### **7. Platform_Context Table**

```sql
CREATE TABLE Platform_Context (
    context_id SERIAL PRIMARY KEY,
    platform VARCHAR(50) NOT NULL,
    content_format TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

### **8. AI_Memory Table**

```sql
CREATE TABLE AI_Memory (
    memory_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    context TEXT NOT NULL,
    last_updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);
```

---

### **9. Content_Analytics Table**

```sql
CREATE TABLE Content_Analytics (
    analytics_id SERIAL PRIMARY KEY,
    content_id INT NOT NULL,
    views INT DEFAULT 0,
    likes INT DEFAULT 0,
    shares INT DEFAULT 0,
    comments INT DEFAULT 0,
    engagement_rate DECIMAL(5, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (content_id) REFERENCES Content(content_id) ON DELETE CASCADE
);
```

---

### **Additional Indexes**

For performance optimization, especially for frequently queried columns like `user_id`, `content_id`, `platform`, etc., you can create indexes as follows:

```sql
-- Index for Users table
CREATE INDEX idx_users_email ON Users(email);

-- Index for Content table
CREATE INDEX idx_content_user_id ON Content(user_id);
CREATE INDEX idx_content_platform ON Content(platform);
CREATE INDEX idx_content_status ON Content(status);

-- Index for Content_Feedback table
CREATE INDEX idx_feedback_user_id ON Content_Feedback(user_id);
CREATE INDEX idx_feedback_content_id ON Content_Feedback(content_id);

-- Index for User_Preferences table
CREATE INDEX idx_preferences_user_id ON User_Preferences(user_id);

-- Index for Content_Analytics table
CREATE INDEX idx_analytics_content_id ON Content_Analytics(content_id);
```

---

### **Explanation of Tables**

1. **Users Table:**
   - Stores user information including authentication credentials and status.

2. **Subscription_Plans Table:**
   - Defines various subscription plans (e.g., free, basic, premium) along with pricing and features.

3. **User_Subscriptions Table:**
   - Manages user subscriptions, linking users to subscription plans with details about start and end dates.

4. **Content Table:**
   - Stores content generated for each user, including platform type, content type (e.g., post, story), and the actual content text.

5. **Content_Feedback Table:**
   - Stores user feedback (rating and comments) on the content they generate.

6. **User_Preferences Table:**
   - Stores user-specific preferences (e.g., tone, writing style) for content generation per platform.

7. **Platform_Context Table:**
   - Defines the platform-specific context for content (e.g., Instagram character limits, LinkedIn style guide).

8. **AI_Memory Table:**
   - Tracks user-specific context or preferences that evolve over time based on interactions with the AI.

9. **Content_Analytics Table:**
   - Stores engagement metrics like views, likes, shares, and comments for each generated piece of content.

---

### **Final Notes**

- **Foreign Keys**: Each table that references another uses `FOREIGN KEY` constraints to ensure referential integrity. For example, in `Content`, `user_id` references `Users(user_id)`.
- **Indexes**: Indexes are used on commonly queried fields like `user_id`, `platform`, and `content_id` to improve search and query performance.
- **Timestamps**: All tables include `created_at` and `updated_at` timestamps to track when records are created and last modified.

By following this schema, you'll have a scalable and organized database structure that can handle the core functionality of SmartContentAI, including content generation, user personalization, and subscription management.