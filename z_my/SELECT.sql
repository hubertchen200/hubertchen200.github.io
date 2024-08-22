SELECT 
    TABLE_NAME,
    CONSTRAINT_NAME,
    CHECK_CLAUSE
FROM 
    INFORMATION_SCHEMA.CHECK_CONSTRAINTS
WHERE 
    CONSTRAINT_SCHEMA = 'mydb'
    AND TABLE_NAME = 'friends';


DELIMITER //

CREATE TRIGGER check_friends_before_update
BEFORE UPDATE ON friends
FOR EACH ROW
BEGIN
    IF NEW.user1 > NEW.user2 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'user1 must be smaller than user2';
    END IF;
END//

DELIMITER ;    



DELIMITER //

CREATE TRIGGER check_friends_before_insert
BEFORE INSERT ON friends
FOR EACH ROW
BEGIN
    IF NEW.user1 > NEW.user2 THEN
        SET @temp = NEW.user1;
        SET NEW.user1 = NEW.user2;
        SET NEW.user2 = @temp;
    END IF;
END//

DELIMITER ;




DELIMITER //

CREATE TRIGGER prevent_duplicate_friend_request
BEFORE INSERT ON requests
FOR EACH ROW
BEGIN
    -- Check if a friendship already exists
    IF EXISTS (
        SELECT 1 
        FROM friends 
        WHERE (user1 = NEW.receiver AND user2 = NEW.sender) 
           OR (user1 = NEW.sender AND user2 = NEW.receiver)
    ) THEN
        -- Raise an error to prevent the insert
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Friendship already exists. Cannot send a friend request to an existing friend.';
    END IF;
END;

//

DELIMITER ;