package org.example.demo.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.StringUtils;
import org.example.demo.application.model.UserFilterRequest;
import org.example.demo.model.User;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserFilterService {
    private final MongoTemplate mongoTemplate;

    List<User> filter(UserFilterRequest request) {
        Query query = new Query();
        if (StringUtils.isNotBlank(request.getName())) {
            query.addCriteria(Criteria.where("name").regex(request.getName(), "i"));
        }
        int pageSize = request.getSize();
        int pageNumber = request.getNumber();
        int skip = (pageNumber - 1) * pageSize;
        query.skip(skip).limit(pageSize);
        return mongoTemplate.find(query, User.class);
    }
}
